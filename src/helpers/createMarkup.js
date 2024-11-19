// Định nghĩa hàm createMarkup
export function createMarkup(theExactHtmlWithTag) {
    return { __html: theExactHtmlWithTag }; // Trả về một đối tượng với thuộc tính __html chứa nội dung HTML
}