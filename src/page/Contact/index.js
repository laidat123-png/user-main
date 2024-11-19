import { Col, Container, Row } from "react-bootstrap"; // Import các component Container, Row, Col từ react-bootstrap
import { Button } from "../../components/Button"; // Import component Button
import { AiFillPhone, AiTwotoneMail, AiFillFacebook } from 'react-icons/ai'; // Import các biểu tượng từ react-icons
import { HiLocationMarker } from 'react-icons/hi'; // Import biểu tượng vị trí từ react-icons
import { CgWebsite } from 'react-icons/cg'; // Import biểu tượng website từ react-icons
import { BiHelpCircle } from 'react-icons/bi'; // Import biểu tượng trợ giúp từ react-icons
import emailjs from 'emailjs-com'; // Import thư viện emailjs để gửi email
import { Spinner } from '../../components/Spinner'; // Import component Spinner để hiển thị biểu tượng loading
import { toast } from 'react-toastify'; // Import thư viện toast để hiển thị thông báo
import { toastConfig } from '../../constants/configToast'; // Import cấu hình toast
import { useState } from "react"; // Import useState từ react
import "./index.css"; // Import file CSS cho component

// Định nghĩa component Contact
export const Contact = () => {
    const [isLoading, setIsLoading] = useState(false); // Khởi tạo state isLoading để quản lý trạng thái loading

    // Hàm xử lý khi submit form
    const onSubmitForm = (e) => {
        setIsLoading(true); // Thiết lập trạng thái loading
        e.preventDefault(); // Ngăn chặn hành vi mặc định của form
        emailjs.sendForm("service_ek2seqq", "template_3i8drd7", e.target, "user_Ye2TEIAtUzzAVwSHhnDUg")
            .then((result) => {
                toast("Đã gửi thành công!", toastConfig); // Hiển thị thông báo thành công
                e.target.reset(); // Reset form
                setIsLoading(false); // Tắt trạng thái loading
            }, (error) => {
                e.target.reset(); // Reset form
                toast(error.text, toastConfig); // Hiển thị thông báo lỗi
                setIsLoading(false); // Tắt trạng thái loading
            });
    }

    return (
        <div className="contact-wrap">
            <Container>
                <div className="form-wrap">
                    <Row>
                        <Col xs={12} lg={6}>
                            <form onSubmit={onSubmitForm}>
                                <div className="form-group_contact">
                                    <input type="text" placeholder="Tên của bạn.." name="name" /> {/* Input để nhập tên */}
                                </div>
                                <div className="form-group_contact">
                                    <input type="text" placeholder="Email của bạn.." name="email" /> {/* Input để nhập email */}
                                </div>
                                <div className="form-group_contact">
                                    <textarea type="text" placeholder="Nội dung..." rows={30} col={45} name="content" /> {/* Textarea để nhập nội dung */}
                                </div>
                                <div>
                                    <Button
                                        label={isLoading ? <Spinner /> : "Gửi"} // Hiển thị nút gửi hoặc biểu tượng loading nếu đang loading
                                    />
                                </div>
                            </form>
                        </Col>
                        <Col xs={12} lg={6}>
                            <div className="contact-main">
                                <div>
                                    <span><AiFillPhone /></span> {/* Hiển thị biểu tượng điện thoại */}
                                    <span>012345678</span> {/* Hiển thị số điện thoại */}
                                </div>
                                <div>
                                    <span><AiTwotoneMail /></span> {/* Hiển thị biểu tượng email */}
                                    <span>abc@gmail.com</span> {/* Hiển thị địa chỉ email */}
                                </div>
                                <div>
                                    <span><AiFillFacebook /></span> {/* Hiển thị biểu tượng Facebook */}
                                    <a href="https://www.facebook.com/dat.laizz">Luci</a> {/* Hiển thị liên kết đến Facebook */}
                                </div>
                                <div>
                                    <span><BiHelpCircle /></span> {/* Hiển thị biểu tượng trợ giúp */}
                                    <span>Trợ giúp</span> {/* Hiển thị văn bản trợ giúp */}
                                </div>
                                <div>
                                    <span><HiLocationMarker /></span> {/* Hiển thị biểu tượng vị trí */}
                                    <span>Phường 1, Quận 8, TPHCM</span> {/* Hiển thị địa chỉ */}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    )
}