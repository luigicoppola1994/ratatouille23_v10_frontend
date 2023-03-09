export class DishRequestDto {
    readonly name: string
    readonly name_lan : string
    readonly description: string
    readonly description_lan : string
    readonly cost: Number
    readonly categoryId: Number  
    readonly allergens: Array<Number[]>
}