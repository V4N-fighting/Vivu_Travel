import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import Banner from '../../Component/Banner';
import Button from '../../Component/BaseComponent/Button/Button';
import { CalendarIcon } from '../../Component/BaseComponent/Icons/CalendarIcon';
import { CarIcon } from '../../Component/BaseComponent/Icons/CarIcon';
import { CircleUserIcon } from '../../Component/BaseComponent/Icons/CircleUserIcon';
import { CheckIcon } from '../../Component/BaseComponent/Icons/CheckIcon';
import { LockIcon } from '../../Component/BaseComponent/Icons/LockIcon';
import { Grid, GridCol, GridRow } from '../../styled';
import ProgressBar from '../Checkout/ProgressBar';
import config from '../../config';

type AdultTraveler = {
  name: string;
  email: string;
  country: string;
  phone: string;
};

type ChildTraveler = {
  name: string;
  age: string;
  country: string;
};

type TourFromState = {
  image: string;
  name: string;
  duration: string | number;
  departureDate?: string;
  price?: { adult: string; child: string };
};

type LocationState = {
  tour?: TourFromState;
};

const emptyAdultTraveler: AdultTraveler = {
  name: '',
  email: '',
  country: '',
  phone: '',
};

const emptyChildTraveler: ChildTraveler = {
  name: '',
  age: '',
  country: '',
};

const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80';

function syncListLength<T>(prev: T[], target: number, empty: T): T[] {
  const next = [...prev];
  while (next.length < target) {
    next.push({ ...(empty as object) } as T);
  }
  if (next.length > target) {
    next.length = target;
  }
  return next;
}

function parsePriceVnd(raw?: string): number {
  if (!raw) return 0;
  return Number(String(raw).replace(/[^\d]/g, '')) || 0;
}

const emailOk = (v: string) => /\S+@\S+\.\S+/.test(v.trim());

function BookingForm(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const tourFromNav = (location.state as LocationState | null)?.tour;

  const [departureDate, setDepartureDate] = useState(
    () => tourFromNav?.departureDate ?? '',
  );
  const [adultCount, setAdultCount] = useState(2);
  const [childCount, setChildCount] = useState(0);
  const [adultTravelers, setAdultTravelers] = useState<AdultTraveler[]>([
    { ...emptyAdultTraveler },
    { ...emptyAdultTraveler },
  ]);
  const [childTravelers, setChildTravelers] = useState<ChildTraveler[]>([]);
  const [specialRequests, setSpecialRequests] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setAdultTravelers((prev) => syncListLength(prev, adultCount, emptyAdultTraveler));
  }, [adultCount]);

  useEffect(() => {
    setChildTravelers((prev) => syncListLength(prev, childCount, emptyChildTraveler));
  }, [childCount]);

  const handleAdultTravelerChange = useCallback(
    <K extends keyof AdultTraveler>(index: number, field: K, value: AdultTraveler[K]) => {
      setAdultTravelers((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], [field]: value };
        return updated;
      });
    },
    [],
  );

  const handleChildTravelerChange = useCallback(
    <K extends keyof ChildTraveler>(index: number, field: K, value: ChildTraveler[K]) => {
      setChildTravelers((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], [field]: value };
        return updated;
      });
    },
    [],
  );

  const setAdultSafe = useCallback((delta: number) => {
    setAdultCount((prev) => Math.max(1, Math.min(30, prev + delta)));
  }, []);

  const setChildSafe = useCallback((delta: number) => {
    setChildCount((prev) => Math.max(0, Math.min(20, prev + delta)));
  }, []);

  const estimatedTotal = useMemo(() => {
    if (!tourFromNav?.price) return 0;
    const a = parsePriceVnd(tourFromNav.price.adult);
    const c = parsePriceVnd(tourFromNav.price.child);
    return adultCount * a + childCount * c;
  }, [tourFromNav, adultCount, childCount]);

  const formattedDeparture = useMemo(() => {
    if (!departureDate) return '';
    try {
      return new Intl.DateTimeFormat('vi-VN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date(departureDate));
    } catch {
      return departureDate;
    }
  }, [departureDate]);

  const progressSteps = useMemo(
    () => [
      { label: 'Chọn ngày', isActive: !departureDate, isCompleted: Boolean(departureDate) },
      { label: 'Du khách', isActive: Boolean(departureDate), isCompleted: false },
      { label: 'Chi tiết thanh toán', isActive: false, isCompleted: false },
      { label: 'Xác nhận', isActive: false, isCompleted: false },
    ],
    [departureDate],
  );

  const validate = useCallback((): string | null => {
    if (!departureDate.trim()) {
      return 'Vui lòng chọn ngày khởi hành.';
    }
    for (let i = 0; i < adultTravelers.length; i += 1) {
      const t = adultTravelers[i];
      if (!t.name.trim()) {
        return `Vui lòng nhập họ tên người lớn #${i + 1}.`;
      }
      if (!emailOk(t.email)) {
        return `Email người lớn #${i + 1} chưa hợp lệ.`;
      }
      if (!t.phone.trim()) {
        return `Vui lòng nhập số điện thoại người lớn #${i + 1}.`;
      }
    }
    for (let i = 0; i < childTravelers.length; i += 1) {
      const c = childTravelers[i];
      if (!c.name.trim()) {
        return `Vui lòng nhập họ tên trẻ em #${i + 1}.`;
      }
    }
    return null;
  }, [departureDate, adultTravelers, childTravelers]);

  const handleSubmit = () => {
    if (isSubmitting) return;
    setSubmitError(null);
    const err = validate();
    if (err) {
      setSubmitError(err);
      return;
    }

    setIsSubmitting(true);
    const tourPayload = {
      image: tourFromNav?.image ?? PLACEHOLDER_IMAGE,
      name: tourFromNav?.name ?? 'Đặt tour — Vivu Travel',
      departureDate,
      duration: tourFromNav?.duration ?? '—',
      price: tourFromNav?.price,
    };

    window.setTimeout(() => {
      navigate(config.routes.check_out, {
        state: {
          myData: {
            total: estimatedTotal,
            adultCounter: adultCount,
            childCounter: childCount,
            data: tourPayload,
          },
          bookingDraft: {
            departureDate,
            adultCount,
            childCount,
            adultTravelers,
            childTravelers,
            specialRequests: specialRequests.trim(),
          },
        },
      });
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <BookingPage>
      <Banner
        background="https://travel-spark.monamedia.net/wp-content/uploads/2023/10/breadcumb-bg.jpg"
        pageName="Đặt tour"
        thisPage={config.routes.booking}
      />
      <Container>
        <ProcessRail>
          <ProgressBar steps={progressSteps} />
        </ProcessRail>
        <Grid>
          <GridRow>
            <GridCol col={7} sm={12}>
              <Section>
                <SectionHeader>
                  <div>
                    <PageTitle>Đặt chỗ chuyến đi</PageTitle>
                    <LeadText>
                      Chọn ngày, số lượng khách và điền thông tin liên hệ. Các ô bắt buộc được kiểm tra trước khi
                      chuyển sang bước thanh toán.
                    </LeadText>
                  </div>
                </SectionHeader>

                <FeatureStrip>
                  <FeatureChip>
                    <FeatureIcon>
                      <CalendarIcon fontSize={18} color="currentColor" />
                    </FeatureIcon>
                    <span>Lịch linh hoạt</span>
                  </FeatureChip>
                  <FeatureChip>
                    <FeatureIcon>
                      <CircleUserIcon fontSize={18} color="currentColor" />
                    </FeatureIcon>
                    <span>Hỗ trợ 24/7</span>
                  </FeatureChip>
                  <FeatureChip>
                    <FeatureIcon>
                      <CarIcon fontSize={18} color="currentColor" />
                    </FeatureIcon>
                    <span>Trọn gói tiện lợi</span>
                  </FeatureChip>
                </FeatureStrip>

                <SubSectionTitle>Lịch trình & số khách</SubSectionTitle>
                <SoftCard>
                  <FormRow as="label" htmlFor="booking-departure">
                    <FormLabel>Ngày khởi hành</FormLabel>
                    <FormInput
                      id="booking-departure"
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                    />
                  </FormRow>

                  <FormRow>
                    <FormLabel as="span">Người lớn</FormLabel>
                    <Counter>
                      <CounterButton
                        type="button"
                        aria-label="Giảm số người lớn"
                        onClick={() => setAdultSafe(-1)}
                      >
                        −
                      </CounterButton>
                      <CounterValue aria-live="polite">{adultCount}</CounterValue>
                      <CounterButton
                        type="button"
                        aria-label="Tăng số người lớn"
                        onClick={() => setAdultSafe(1)}
                      >
                        +
                      </CounterButton>
                    </Counter>
                  </FormRow>

                  <FormRow>
                    <FormLabel as="span">Trẻ em</FormLabel>
                    <Counter>
                      <CounterButton
                        type="button"
                        aria-label="Giảm số trẻ em"
                        onClick={() => setChildSafe(-1)}
                      >
                        −
                      </CounterButton>
                      <CounterValue aria-live="polite">{childCount}</CounterValue>
                      <CounterButton
                        type="button"
                        aria-label="Tăng số trẻ em"
                        onClick={() => setChildSafe(1)}
                      >
                        +
                      </CounterButton>
                    </Counter>
                  </FormRow>
                </SoftCard>

                <SubSectionTitle>Thông tin du khách</SubSectionTitle>

                {adultTravelers.map((traveler, index) => (
                  <TravelerCard key={`adult-${index}`}>
                    <TravelerHeading>Người lớn #{index + 1}</TravelerHeading>
                    <TravelerGrid>
                      <Field>
                        <SmallLabel htmlFor={`adult-name-${index}`}>Họ và tên *</SmallLabel>
                        <FormInput
                          id={`adult-name-${index}`}
                          type="text"
                          autoComplete="name"
                          placeholder="Nguyễn Văn A"
                          value={traveler.name}
                          onChange={(e) => handleAdultTravelerChange(index, 'name', e.target.value)}
                        />
                      </Field>
                      <Field>
                        <SmallLabel htmlFor={`adult-email-${index}`}>Email *</SmallLabel>
                        <FormInput
                          id={`adult-email-${index}`}
                          type="email"
                          autoComplete="email"
                          placeholder="email@example.com"
                          value={traveler.email}
                          onChange={(e) => handleAdultTravelerChange(index, 'email', e.target.value)}
                        />
                      </Field>
                      <Field>
                        <SmallLabel htmlFor={`adult-country-${index}`}>Quốc gia</SmallLabel>
                        <FormInput
                          id={`adult-country-${index}`}
                          type="text"
                          autoComplete="country-name"
                          placeholder="Việt Nam"
                          value={traveler.country}
                          onChange={(e) => handleAdultTravelerChange(index, 'country', e.target.value)}
                        />
                      </Field>
                      <Field>
                        <SmallLabel htmlFor={`adult-phone-${index}`}>Điện thoại *</SmallLabel>
                        <FormInput
                          id={`adult-phone-${index}`}
                          type="tel"
                          autoComplete="tel"
                          placeholder="+84 …"
                          value={traveler.phone}
                          onChange={(e) => handleAdultTravelerChange(index, 'phone', e.target.value)}
                        />
                      </Field>
                    </TravelerGrid>
                  </TravelerCard>
                ))}

                {childTravelers.map((traveler, index) => (
                  <TravelerCard key={`child-${index}`}>
                    <TravelerHeading>Trẻ em #{index + 1}</TravelerHeading>
                    <TravelerGrid>
                      <Field>
                        <SmallLabel htmlFor={`child-name-${index}`}>Họ và tên *</SmallLabel>
                        <FormInput
                          id={`child-name-${index}`}
                          type="text"
                          placeholder="Nguyễn B"
                          value={traveler.name}
                          onChange={(e) => handleChildTravelerChange(index, 'name', e.target.value)}
                        />
                      </Field>
                      <Field>
                        <SmallLabel htmlFor={`child-age-${index}`}>Tuổi</SmallLabel>
                        <FormInput
                          id={`child-age-${index}`}
                          type="number"
                          inputMode="numeric"
                          min={0}
                          max={17}
                          placeholder="Ví dụ: 8"
                          value={traveler.age}
                          onChange={(e) => handleChildTravelerChange(index, 'age', e.target.value)}
                        />
                      </Field>
                      <Field $span={2}>
                        <SmallLabel htmlFor={`child-country-${index}`}>Quốc gia</SmallLabel>
                        <FormInput
                          id={`child-country-${index}`}
                          type="text"
                          placeholder="Việt Nam"
                          value={traveler.country}
                          onChange={(e) => handleChildTravelerChange(index, 'country', e.target.value)}
                        />
                      </Field>
                    </TravelerGrid>
                  </TravelerCard>
                ))}

                <SubSectionTitle>Ghi chú thêm</SubSectionTitle>
                <SoftCard>
                  <Field>
                    <SmallLabel htmlFor="booking-notes">Yêu cầu đặc biệt (không bắt buộc)</SmallLabel>
                    <NotesArea
                      id="booking-notes"
                      rows={4}
                      placeholder="Dị ứng thực phẩm, ghế trẻ em, giờ đón khách…"
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                    />
                  </Field>
                </SoftCard>

                {submitError && <ErrorBanner role="alert">{submitError}</ErrorBanner>}

                <ActionRow>
                  <Button
                    orange
                    style={{
                      opacity: isSubmitting ? 0.65 : 1,
                      pointerEvents: isSubmitting ? 'none' : 'auto',
                    }}
                    onClick={handleSubmit}
                  >
                    {isSubmitting ? 'Đang chuyển…' : 'Tiếp tục đến thanh toán'}
                  </Button>
                </ActionRow>
              </Section>
            </GridCol>
            <GridCol col={5} sm={12}>
              <SummaryAside>
                <SummaryCard>
                  <SummaryTitle>Tóm tắt</SummaryTitle>

                  {tourFromNav && (
                    <TourPreview>
                      <TourThumb src={tourFromNav.image} alt="" />
                      <TourMeta>
                        <TourName>{tourFromNav.name}</TourName>
                        {tourFromNav.duration !== undefined && tourFromNav.duration !== '' && (
                          <TourHint>Thời lượng: {String(tourFromNav.duration)}</TourHint>
                        )}
                      </TourMeta>
                    </TourPreview>
                  )}

                  <SummaryItem>
                    <SummaryLabel>Ngày khởi hành</SummaryLabel>
                    <SummaryValue>{formattedDeparture || 'Chưa chọn'}</SummaryValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryLabel>Người lớn</SummaryLabel>
                    <SummaryValue>{adultCount}</SummaryValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryLabel>Trẻ em</SummaryLabel>
                    <SummaryValue>{childCount}</SummaryValue>
                  </SummaryItem>
                  {estimatedTotal > 0 && (
                    <SummaryItem>
                      <SummaryLabel>Tạm tính</SummaryLabel>
                      <SummaryValue>{estimatedTotal.toLocaleString('vi-VN')} đ</SummaryValue>
                    </SummaryItem>
                  )}

                  <TrustList>
                    <TrustRow>
                      <CheckIcon fontSize={16} color="#0d9488" />
                      <span>Không lưu thẻ trên trang này</span>
                    </TrustRow>
                    <TrustRow>
                      <LockIcon fontSize={16} color="#0d9488" />
                      <span>Thanh toán an toàn ở bước sau</span>
                    </TrustRow>
                  </TrustList>

                  <SummaryFoot>
                    Bạn có thể chỉnh sửa số lượng và thông tin trước khi thanh toán. Dữ liệu gửi kèm khi chuyển
                    trang để đồng bộ với bước checkout.
                  </SummaryFoot>
                </SummaryCard>
              </SummaryAside>
            </GridCol>
          </GridRow>
        </Grid>
      </Container>
    </BookingPage>
  );
}

const BookingPage = styled.div`
  background: linear-gradient(165deg, #f8fafc 0%, #eef2ff 42%, #ffffff 100%);
  min-height: 100vh;
`;

const Container = styled.div`
  padding: 56px 20px 100px;
  max-width: 1250px;
  width: 100%;
  margin: 0 auto;
`;

const ProcessRail = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 36px;
  padding: 20px 16px;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.06);
`;

const Section = styled.div`
  background: #ffffff;
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.08);
  padding: clamp(28px, 4vw, 48px);
  border-radius: 28px;
  margin-bottom: 24px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 220px;
    height: 220px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, transparent 70%);
    top: -80px;
    right: -80px;
    pointer-events: none;
  }
`;

const SectionHeader = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: 8px;
`;

const PageTitle = styled.h1`
  margin: 0 0 12px;
  font-size: clamp(1.55rem, 2.4vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #0f172a;
`;

const LeadText = styled.p`
  margin: 0;
  max-width: 52ch;
  font-size: 15px;
  line-height: 1.65;
  color: #475569;
`;

const FeatureStrip = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 22px 0 28px;
  position: relative;
  z-index: 1;
`;

const FeatureChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  color: #0f172a;
  background: #f1f5f9;
  border: 1px solid rgba(15, 23, 42, 0.06);
`;

const FeatureIcon = styled.span`
  display: flex;
  color: #0ea5e9;
`;

const SubSectionTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 1.1rem;
  font-weight: 800;
  color: #0f172a;
  position: relative;
  z-index: 1;
`;

const SoftCard = styled.div`
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
  border: 1px solid rgba(15, 23, 42, 0.07);
  border-radius: 20px;
  padding: 22px 22px 8px;
  margin-bottom: 28px;
  position: relative;
  z-index: 1;
`;

const FormRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 18px;
  flex-wrap: wrap;
`;

const FormLabel = styled.label`
  flex: 1 1 160px;
  font-weight: 700;
  color: #334155;
  font-size: 14px;
`;

const SmallLabel = styled.label`
  display: block;
  font-size: 12px;
  font-weight: 700;
  color: #64748b;
  margin-bottom: 6px;
`;

const Field = styled.div<{ $span?: number }>`
  grid-column: ${({ $span }) => ($span ? `span ${$span}` : 'span 1')};

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  font-size: 15px;
  background: #ffffff;
  color: #0f172a;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #0ea5e9;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.2);
  }
`;

const NotesArea = styled.textarea`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  font-size: 15px;
  font-family: inherit;
  resize: vertical;
  min-height: 110px;
  background: #ffffff;
  color: #0f172a;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: #0ea5e9;
    box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.2);
  }
`;

const Counter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 160px;
`;

const CounterButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  color: #0f172a;
  background: #ffffff;
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;

  &:hover {
    background: #f8fafc;
    border-color: #0ea5e9;
    color: #0284c7;
  }
`;

const CounterValue = styled.div`
  min-width: 48px;
  text-align: center;
  font-size: 17px;
  font-weight: 800;
  color: #0f172a;
`;

const TravelerCard = styled.div`
  background: #ffffff;
  border: 1px solid rgba(15, 23, 42, 0.07);
  border-radius: 18px;
  padding: 22px;
  margin-bottom: 16px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.04);
  position: relative;
  z-index: 1;
`;

const TravelerHeading = styled.div`
  font-weight: 800;
  font-size: 15px;
  color: #0369a1;
  margin-bottom: 14px;
`;

const TravelerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px 18px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ErrorBanner = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 12px 16px;
  border-radius: 14px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  font-size: 14px;
  font-weight: 600;
`;

const ActionRow = styled.div`
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  position: relative;
  z-index: 1;
`;

const SummaryAside = styled.aside`
  @media (min-width: 992px) {
    position: sticky;
    top: 96px;
  }
`;

const SummaryCard = styled.div`
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 24px;
  padding: 26px;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
  border: 1px solid rgba(15, 23, 42, 0.06);
`;

const SummaryTitle = styled.div`
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 18px;
  color: #0f172a;
`;

const TourPreview = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  margin-bottom: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid #e2e8f0;
`;

const TourThumb = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 14px;
  object-fit: cover;
  flex-shrink: 0;
`;

const TourMeta = styled.div`
  min-width: 0;
`;

const TourName = styled.div`
  font-weight: 800;
  font-size: 14px;
  color: #0f172a;
  line-height: 1.35;
`;

const TourHint = styled.div`
  margin-top: 4px;
  font-size: 12px;
  color: #64748b;
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f1f5f9;
`;

const SummaryLabel = styled.div`
  font-size: 14px;
  color: #64748b;
`;

const SummaryValue = styled.div`
  font-size: 14px;
  font-weight: 800;
  color: #0f172a;
  text-align: right;
`;

const TrustList = styled.ul`
  list-style: none;
  margin: 18px 0 0;
  padding: 0;
`;

const TrustRow = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #475569;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SummaryFoot = styled.p`
  margin: 18px 0 0;
  font-size: 13px;
  line-height: 1.6;
  color: #64748b;
`;

export default BookingForm;
