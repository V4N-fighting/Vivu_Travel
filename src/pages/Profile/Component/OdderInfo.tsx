import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { GET_BOOKING } from "../../../api";

interface BookingItem {
  id: number;
  booking_code: string;
  tour_name: string;
  departure_date: string;
  adult_count: number;
  child_count: number;
  total_price: number;
  status: string;
  created_at: string;
}

const OrderInfo = () => {
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) {
          setLoading(false);
          return;
        }
        const user = JSON.parse(userStr);
        const res = await axios.get(`${GET_BOOKING}/user/${user.id}`, {
          headers: { Authorization: `Bearer ${user.access_token}` },
        });
        setBookings(res.data);
      } catch (error) {
        console.error("Lỗi tải lịch sử booking:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmed": return "Đã xác nhận";
      case "pending": return "Chờ xử lý";
      case "cancelled": return "Đã hủy";
      case "completed": return "Hoàn thành";
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "#22c55e";
      case "pending": return "#f59e0b";
      case "cancelled": return "#ef4444";
      case "completed": return "#3b82f6";
      default: return "#6b7280";
    }
  };

  if (loading) return <Text>Đang tải...</Text>;

  return (
    <>
      <Title>Đặt Tour</Title>
      <Text>
        Dưới đây là danh sách các đặt tour đã được thực hiện.
      </Text>
      {bookings.length === 0 ? (
        <Text small>Bạn chưa thực hiện tour nào.</Text>
      ) : (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>Mã đặt</Th>
                <Th>Tour</Th>
                <Th>Ngày khởi hành</Th>
                <Th>Khách</Th>
                <Th>Tổng tiền</Th>
                <Th>Trạng thái</Th>
                <Th>Ngày đặt</Th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <Td><Code>{b.booking_code}</Code></Td>
                  <Td>{b.tour_name}</Td>
                  <Td>{b.departure_date ? new Date(b.departure_date).toLocaleDateString("vi-VN") : "—"}</Td>
                  <Td>{b.adult_count} NL, {b.child_count} TE</Td>
                  <Td>{Number(b.total_price).toLocaleString("vi-VN")} đ</Td>
                  <Td>
                    <StatusBadge color={getStatusColor(b.status)}>
                      {getStatusLabel(b.status)}
                    </StatusBadge>
                  </Td>
                  <Td>{new Date(b.created_at).toLocaleDateString("vi-VN")}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      )}
    </>
  );
};

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #222222;
  line-height: 1;
  margin-bottom: 20px;
`;

const Text = styled.div<{ small?: boolean }>`
  font-size: ${(props) => (props.small ? "16px" : "20px")};
  color: #555555;
  line-height: 1;
  margin-bottom: 16px;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  margin-top: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px 10px;
  background: #f1f5f9;
  color: #334155;
  font-weight: 600;
  border-bottom: 2px solid #e2e8f0;
  white-space: nowrap;
`;

const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #e2e8f0;
  color: #475569;
  vertical-align: middle;
`;

const Code = styled.span`
  font-family: monospace;
  background: #f8fafc;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
`;

const StatusBadge = styled.span<{ color: string }>`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  background: ${(props) => props.color};
`;

export default OrderInfo;
