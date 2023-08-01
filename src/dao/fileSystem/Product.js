export class Product {
    constructor({ title, description, code, price, status, stock, category, thumbnails, id }){
        this.id = id,
        this.title = title,
        this.description = description,
        this.code = code,
        this.price = price,
        this.status = status,
        this.stock = stock,       
        this.thumbnails = thumbnails,
        this.category = category
    }
} 