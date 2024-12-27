import { useProfileStore } from "@/stores/profile"

const useAuth = (to: any, from: any, next: CallableFunction) => {
    const profileStore = useProfileStore()

    if (profileStore.isAuthenticated === false) {
        return next({name: 'login'})
    }

    return next()
}

export default useAuth