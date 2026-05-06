import api from "@/plugins/axios"

export const getUsers = async () => {
    let response = await api.get("/users/")
    let data = response.data
    alert(JSON.stringify(data))
    return data
}

