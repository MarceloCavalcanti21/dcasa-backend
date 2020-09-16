// [x] Definir quais são os campos necessário para cadastro desse domínio
// [x] Renomear a interface de acordo com o escopo dela

export default interface IListMineDeliveryDTO {
    user_id: string;
    inicial_day: number;
    inicial_month: number;
    inicial_year: number;
    final_day: number;
    final_month: number;
    final_year: number;
}
