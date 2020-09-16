// [x] Definir quais são os campos necessário para cadastro desse domínio
// [x] Renomear a interface de acordo com o escopo dela

export default interface ICreateDeliveryDTO {
    adress_id: string;
    hour: number;
    minute: number;
    user_id: string;
    status: number;
    delay: number;
    motoboy_id?: string;
    category_id: string;
}
