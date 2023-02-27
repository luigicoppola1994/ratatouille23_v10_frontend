/* eslint-disable prettier/prettier */

import { UserRoles } from "src/utils"

export interface SignupOpRequestDto {
    readonly email: string
    readonly name: string
    readonly surname: string    
    readonly password: string
    readonly role: UserRoles
}

