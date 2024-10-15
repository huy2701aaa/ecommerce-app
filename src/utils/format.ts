export const formatCurrency = (amount: any) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
    }).format(amount);
}


export const formatDate = (date: string) => {
    return date.split('T')[0].split('-').reverse().join('/')
}