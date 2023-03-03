export class DishRequestDto {
    readonly name: string
    readonly description: string
    readonly cost: Number
    readonly categoryId: Number  
    readonly allergens: Array<Number[]>
}