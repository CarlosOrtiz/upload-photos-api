let userInfo: string;
let username: string = 'anbreaker';
let phone: number;
// phone = '+367128815'; --> Error de tipo
phone = 924234669;
let isPro: boolean;
isPro = true;
username = 'Javier'
userInfo = `
    User info:
    username: ${username}
    firtsname: ${username + ' anbreaker'}
    phone: ${phone}
    isPro: ${isPro}
`;

console.log(userInfo);