export class DishRequestDto {
    readonly name: string
    readonly description: string
    readonly cost: Number
    readonly categoryName: string  
    readonly allergens: Array<Number[]>
}