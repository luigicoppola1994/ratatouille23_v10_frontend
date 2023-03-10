export class DishRequestDto {
    readonly name: string
    readonly nameLan : string
    readonly description: string
    readonly descriptionLan : string
    readonly cost: Number
    readonly categoryId: Number  
    readonly allergens: Array<Number[]>
}