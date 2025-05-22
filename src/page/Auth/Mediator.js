// Mediator.js (Giao diện Trung Gian)
class Mediator {
    constructor() {
        if (new.target === Mediator) {
            throw new Error("Cannot instantiate an abstract class.");
        }
    }

    // Phương thức thông báo sự kiện (phải được triển khai bởi lớp con)
    notify(sender, event, data) {
        throw new Error("Method 'notify()' must be implemented.");
    }

    // Đăng ký các đối tượng cộng tác (phải được triển khai bởi lớp con)
    register(name, component) {
        throw new Error("Method 'register()' must be implemented.");
    }
}

export default Mediator;