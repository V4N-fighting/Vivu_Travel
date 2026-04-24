import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { POSTGRES_POOL } from '../../database/postgres.provider';

@Injectable()
export class ExportService {
  constructor(@Inject(POSTGRES_POOL) private readonly pool: Pool) {}

  async exportTravelersToCsv(bookingId: number): Promise<string> {
    const query = `
      SELECT full_name, email, phone, country, type 
      FROM travelers 
      WHERE booking_id = $1
    `;
    const result = await this.pool.query(query, [bookingId]);
    
    // Tạo header cho file CSV
    let csvContent = 'Họ tên,Email,Số điện thoại,Quốc gia,Loại khách\n';
    
    // Thêm dữ liệu từng dòng
    result.rows.forEach(row => {
      csvContent += `${row.full_name},${row.email},${row.phone},${row.country},${row.type}\n`;
    });

    return csvContent;
  }
}
