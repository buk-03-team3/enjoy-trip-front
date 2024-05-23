export function createPersistedStatePlugin() {
    return (context) => {
        const storeId = context.store.$id

        // 스토어의 상태를 로컬 스토리지에 저장
        context.store.$subscribe((mutation, state) => {
            if (storeId == 'travelStore') {
                return
            }
            localStorage.setItem(storeId, JSON.stringify(state))
            console.log(storeId)
        })


        // 로컬 스토리지에서 스토어의 상태를 복원
        const savedState = localStorage.getItem(storeId)
        if (savedState) {
            context.store.$patch(JSON.parse(savedState))
        }
    }
}
