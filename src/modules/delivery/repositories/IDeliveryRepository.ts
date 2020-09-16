// [x] Corrigir importações
// [x] Alterar o nome desse arquivo na declaração e na exportação
// [x] implementar os métodos necessários

import Delivery from '../infra/typeorm/entities/Delivery';
import ICreateDelivery from '../dtos/ICreateDeliveryDTO';
import IListDeliveryDTO from '../dtos/IListDeliveryDTO';
import IListMineDeliveryDTO from '../dtos/IListMineDeliveryDTO';
import IListActiveStoresForAdminDTO from '../dtos/IListActiveStoresForAdminDTO';
import IShowAllTodayDTO from '../dtos/IShowAllTodayDTO';

export default interface IDeliveryRepository {
    // Criação de um novo registro, geralmente por parte do estabelecimento
    create(data: ICreateDelivery): Promise<Delivery>;
    // Edição de registro
    save(delivery: Delivery): Promise<Delivery>;
    // Busca pelo ID de um registro
    findById(id: string): Promise<Delivery | undefined>;
    // Exclui o registro
    remove(id: string): Promise<void>;
    // Lista para o estabelecimento, a lista de pedido em aberto que ele tem
    showMine(user_id: string): Promise<Delivery[]>;
    // Lista todas as entregas de HOJE para o ADMIN (aceitas e em aberto)
    showAllToday(data: IShowAllTodayDTO): Promise<Delivery[]>;
    // INATIVO: Mostra para o motoboy, no DASHBOARD, quais são as entregas não aceitas
    showOpenDeliveries(category_id: string): Promise<Delivery[] | undefined>;
    // TESTE DE CARDS: Mostra para o motoboy, no DASHBOARD, quais são as entregas não aceitas referentes à sua categoria, em uma ScrollView horizontal
    showForMotoboy(
        storeId: string,
        category_id: string,
    ): Promise<Delivery[] | undefined>;
    // Lista os estabelecimentos com entregas em aberto para o ADMIN
    listActiveStoresForAdmin(
        data: IListActiveStoresForAdminDTO,
    ): Promise<Delivery[] | undefined>;
    // Lista os estabelecimentos com entregas em aberto para o MOTOBOY
    listActiveStores(category_id: string): Promise<Delivery[] | undefined>;
    // Mostra para o motoboy, na aba de entregas aceitas, a lista com as que ele aceitou
    showMineAcceptedDeliveries(user_id: string): Promise<Delivery[]>;
    // Função do administrador, para listar o total de pedidos de cada estabelecimento.
    sumDebts(data: IListDeliveryDTO): Promise<Delivery[]>;
    listDebts(data: IListDeliveryDTO): Promise<Delivery[]>;
    // Função do estabelecimento, para listar o total de pedidos realizados e atendidos.
    sumMineDebts(data: IListMineDeliveryDTO): Promise<Delivery[]>;
    listMineDebts(data: IListMineDeliveryDTO): Promise<Delivery[]>;
}
