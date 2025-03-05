export class Item {
    constructor(A = null) {
        // Nếu A là một đối tượng, sao chép các thuộc tính
        if (A) {
            this.ten = A.ten;
            this.TL = A.TL;
            this.GT = A.GT;
            this.DG = A.DG;
            this.SL = A.SL;
            this.PA = A.PA;
            this.id = A.id;
        } else {
            // Nếu không có đối tượng A, sử dụng giá trị mặc định
            this.ten = '';
            this.TL = 0;
            this.GT = 0;
            this.DG = 0;
            this.PA = 0;
            this.id = 0;
        }
    }
}
