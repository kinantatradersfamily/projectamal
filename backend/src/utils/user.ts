import { getAccessWilayahDomain } from "src/services/domain/User";
import { User } from "../services/models/User"

export class RequestUser implements User {
    id: number;
    username: string;
    active: number;
    created_at: number;
    password: string;
    role_id: number;
    profile_img: string;
    user_wilayah: number;

    constructor(user: User) {
        this.id = user.id
        this.username = user.username
        this.active = user.active
        this.created_at = user.created_at
        this.password = user.password
        this.role_id = user.role_id
        this.profile_img = user.profile_img
        this.user_wilayah = user.user_wilayah
    }

    async getAccessWilayah() {
        return await getAccessWilayahDomain(this.id)
    }
}