import { UserRoles } from 'src/utils';


export interface UserRequestDto {
    readonly id: Number,
    readonly email: string,
    readonly name: string,
    readonly surname: string,    
    readonly password: string,
    readonly role: UserRoles,
    readonly restaurantId: Number,
    readonly enabled: boolean,
    readonly firstAccess: boolean

}
