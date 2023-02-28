/* eslint-disable prettier/prettier */

import { UserRoles } from "src/utils"

export interface SignupOpRequestDto {
    
    readonly name: string
    readonly surname: string   
    readonly email: string 
    readonly password: string
    readonly role: UserRoles
    readonly restaurantId : Number
    readonly enabled : boolean
    readonly firstAccess: boolean

    
}

