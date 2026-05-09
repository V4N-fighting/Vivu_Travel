import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { POSTGRES_POOL } from '../../database/postgres.provider';

interface TourResult {
  id: number;
  name: string;
  description?: string;
  country_name?: string;
  tour_type_name?: string;
  duration?: string;
  price_adult?: string;
  price_child?: string;
  max_people?: number;
  meeting_point?: string;
}

interface CountryResult {
  id: number;
  name: string;
  description?: string;
  tour_count?: string;
}

interface BlogResult {
  id: number;
  title: string;
  slug: string;
  content?: string;
}

interface CouponResult {
  code: string;
  discount_type: string;
  discount_value: string;
  min_order_value?: string;
  max_discount_amount?: string;
  valid_to?: string;
}

@Injectable()
export class ChatbotService {
  constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}

  async ask(rawMessage: string) {
    const message = (rawMessage || '').trim();
    if (!message) {
      return {
        answer: 'Bạn hãy nhập câu hỏi về tour, điểm đến, giá tour, lịch trình hoặc mã giảm giá để Vivu Travel hỗ trợ nhé.',
        suggestions: this.defaultSuggestions(),
      };
    }

    const terms = this.extractTerms(message);
    const intent = this.detectIntent(message);
    let [tours, countries, blogs, coupons] = await Promise.all([
      this.searchTours(message, terms),
      this.searchCountries(message, terms),
      this.searchBlogs(message, terms),
      this.searchCoupons(),
    ]);

    if (!tours.length && this.isTourSuggestionRequest(message)) {
      tours = await this.getFeaturedTours();
    }

    const answer = this.composeAnswer(message, intent, tours, countries, blogs, coupons);

    return {
      answer,
      data: {
        tours: tours.slice(0, 3).map((tour) => ({
          id: tour.id,
          name: tour.name,
          country: tour.country_name,
          duration: tour.duration,
          priceAdult: Number(tour.price_adult || 0),
        })),
      },
      suggestions: this.buildSuggestions(tours, countries, coupons),
    };
  }

  private async searchTours(message: string, terms: string[]): Promise<TourResult[]> {
    const params = [`%${message}%`, terms];
    const query = `
      SELECT DISTINCT t.id, t.name, t.description, t.duration, t.price_adult, t.price_child,
             t.max_people, t.meeting_point, c.name AS country_name, tt.name AS tour_type_name
      FROM tours t
      LEFT JOIN countries c ON c.id = t.country_id
      LEFT JOIN tour_types tt ON tt.id = t.tour_type_id
      LEFT JOIN tour_activities ta ON ta.tour_id = t.id
      LEFT JOIN activities a ON a.id = ta.activity_id
      WHERE t.is_active = TRUE
        AND (
          t.name ILIKE $1
          OR t.description ILIKE $1
          OR c.name ILIKE $1
          OR tt.name ILIKE $1
          OR a.name ILIKE $1
          OR EXISTS (
            SELECT 1
            FROM unnest($2::text[]) AS term
            WHERE t.name ILIKE '%' || term || '%'
               OR t.description ILIKE '%' || term || '%'
               OR c.name ILIKE '%' || term || '%'
               OR tt.name ILIKE '%' || term || '%'
               OR a.name ILIKE '%' || term || '%'
          )
        )
      ORDER BY t.id DESC
      LIMIT 5
    `;
    const result = await this.pool.query(query, params);
    return result.rows;
  }

  private async getFeaturedTours(): Promise<TourResult[]> {
    const query = `
      SELECT t.id, t.name, t.description, t.duration, t.price_adult, t.price_child,
             t.max_people, t.meeting_point, c.name AS country_name, tt.name AS tour_type_name
      FROM tours t
      LEFT JOIN countries c ON c.id = t.country_id
      LEFT JOIN tour_types tt ON tt.id = t.tour_type_id
      WHERE t.is_active = TRUE
      ORDER BY t.created_at DESC
      LIMIT 5
    `;
    const result = await this.pool.query(query);
    return result.rows;
  }

  private async searchCountries(message: string, terms: string[]): Promise<CountryResult[]> {
    const query = `
      SELECT c.id, c.name, c.description, COUNT(t.id) AS tour_count
      FROM countries c
      LEFT JOIN tours t ON t.country_id = c.id AND t.is_active = TRUE
      WHERE c.name ILIKE $1
         OR c.description ILIKE $1
         OR EXISTS (
          SELECT 1 FROM unnest($2::text[]) AS term
          WHERE c.name ILIKE '%' || term || '%'
             OR c.description ILIKE '%' || term || '%'
         )
      GROUP BY c.id
      ORDER BY c.name ASC
      LIMIT 4
    `;
    const result = await this.pool.query(query, [`%${message}%`, terms]);
    return result.rows;
  }

  private async searchBlogs(message: string, terms: string[]): Promise<BlogResult[]> {
    const query = `
      SELECT id, title, slug, content
      FROM blogs
      WHERE status = 'published'
        AND (
          title ILIKE $1
          OR content ILIKE $1
          OR EXISTS (
            SELECT 1 FROM unnest($2::text[]) AS term
            WHERE title ILIKE '%' || term || '%'
               OR content ILIKE '%' || term || '%'
          )
        )
      ORDER BY published_at DESC NULLS LAST, created_at DESC
      LIMIT 3
    `;
    const result = await this.pool.query(query, [`%${message}%`, terms]);
    return result.rows;
  }

  private async searchCoupons(): Promise<CouponResult[]> {
    const query = `
      SELECT code, discount_type, discount_value, min_order_value, max_discount_amount, valid_to
      FROM coupons
      WHERE is_active = TRUE
        AND (valid_from IS NULL OR valid_from <= CURRENT_DATE)
        AND (valid_to IS NULL OR valid_to >= CURRENT_DATE)
        AND (usage_limit IS NULL OR used_count < usage_limit)
      ORDER BY discount_value DESC
      LIMIT 3
    `;
    const result = await this.pool.query(query);
    return result.rows;
  }

  private composeAnswer(
    message: string,
    intent: string,
    tours: TourResult[],
    countries: CountryResult[],
    blogs: BlogResult[],
    coupons: CouponResult[],
  ) {
    if (intent === 'coupon') {
      if (!coupons.length) {
        return 'Hiện tại hệ thống chưa có mã giảm giá còn hiệu lực. Bạn có thể để lại thông tin liên hệ để nhân viên tư vấn ưu đãi mới nhất.';
      }
      return `Hiện có ${coupons.length} mã giảm giá còn hiệu lực:\n${coupons
        .map((coupon) => `- ${coupon.code}: ${this.formatCoupon(coupon)}`)
        .join('\n')}`;
    }

    if (intent === 'price' && tours.length) {
      return `Mình tìm thấy các tour phù hợp với câu hỏi về giá:\n${tours
        .slice(0, 3)
        .map((tour) => `- ${tour.name}: người lớn ${this.formatMoney(tour.price_adult)}, trẻ em ${this.formatMoney(tour.price_child)}; thời lượng ${tour.duration}.`)
        .join('\n')}\nBạn có thể vào chi tiết tour để chọn ngày khởi hành và đặt chỗ.`;
    }

    if (intent === 'destination' && countries.length) {
      return `Các điểm đến phù hợp:\n${countries
        .map((country) => `- ${country.name}: ${this.shorten(country.description, 130)} (${country.tour_count || 0} tour)`)
        .join('\n')}`;
    }

    if (tours.length) {
      return `Mình gợi ý các tour phù hợp nhất từ dữ liệu Vivu Travel:\n${tours
        .slice(0, 3)
        .map((tour) => `- ${tour.name} (${tour.country_name || 'điểm đến đang cập nhật'}): ${tour.duration}, từ ${this.formatMoney(tour.price_adult)}. ${this.shorten(tour.description, 120)}`)
        .join('\n')}`;
    }

    if (blogs.length) {
      return `Mình chưa thấy tour khớp trực tiếp, nhưng có bài viết liên quan:\n${blogs
        .map((blog) => `- ${blog.title}: ${this.shorten(blog.content, 140)}`)
        .join('\n')}`;
    }

    return `Mình chưa tìm thấy dữ liệu phù hợp cho câu hỏi "${message}". Bạn có thể hỏi theo tên tour, điểm đến, loại tour, hoạt động, giá tour hoặc mã giảm giá.`;
  }

  private detectIntent(message: string) {
    const normalized = message.toLowerCase();
    if (/(mã|ma|coupon|voucher|giảm giá|giam gia|ưu đãi|uu dai)/i.test(normalized)) return 'coupon';
    if (/(giá|gia|bao nhiêu|bao nhieu|price|chi phí|chi phi)/i.test(normalized)) return 'price';
    if (/(điểm đến|diem den|destination|ở đâu|o dau|quốc gia|quoc gia)/i.test(normalized)) return 'destination';
    return 'general';
  }

  private isTourSuggestionRequest(message: string) {
    return /(tour|du lịch|du lich|gợi ý|goi y|nổi bật|noi bat|phù hợp|phu hop|gia đình|gia dinh)/i.test(message);
  }

  private extractTerms(message: string) {
    const stopWords = new Set([
      'toi', 'tôi', 'muon', 'muốn', 'tim', 'tìm', 'tour', 'du', 'lich', 'du lịch',
      'co', 'có', 'khong', 'không', 'cho', 'minh', 'ban', 'bạn', 'hoi', 'hỏi',
      'gia', 'giá', 'ma', 'mã', 've', 'về', 'di', 'đi', 'la', 'là',
    ]);

    return message
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, ' ')
      .split(/\s+/)
      .map((term) => term.trim())
      .filter((term) => term.length >= 2 && !stopWords.has(term))
      .slice(0, 8);
  }

  private buildSuggestions(tours: TourResult[], countries: CountryResult[], coupons: CouponResult[]) {
    const suggestions = [
      tours[0] ? `Cho tôi biết giá tour ${tours[0].name}` : '',
      countries[0] ? `Có tour nào ở ${countries[0].name}?` : '',
      coupons.length ? 'Hiện có mã giảm giá nào?' : '',
    ].filter(Boolean);

    return suggestions.length ? suggestions : this.defaultSuggestions();
  }

  private defaultSuggestions() {
    return [
      'Gợi ý tour du lịch nổi bật',
      'Có mã giảm giá nào không?',
      'Tour nào phù hợp cho gia đình?',
    ];
  }

  private formatMoney(value?: string) {
    const amount = Number(value || 0);
    if (!amount) return 'đang cập nhật';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  }

  private formatCoupon(coupon: CouponResult) {
    const value = Number(coupon.discount_value || 0);
    const discount = coupon.discount_type === 'percentage'
      ? `giảm ${value}%`
      : `giảm ${this.formatMoney(coupon.discount_value)}`;
    const minOrder = Number(coupon.min_order_value || 0)
      ? `, đơn tối thiểu ${this.formatMoney(coupon.min_order_value)}`
      : '';
    const maxDiscount = Number(coupon.max_discount_amount || 0)
      ? `, giảm tối đa ${this.formatMoney(coupon.max_discount_amount)}`
      : '';
    return `${discount}${minOrder}${maxDiscount}`;
  }

  private shorten(value = '', maxLength: number) {
    const text = value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    if (!text) return 'Thông tin đang được cập nhật.';
    return text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text;
  }
}
