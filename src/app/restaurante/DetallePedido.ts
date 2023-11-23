export class DetallePedido {
    cantidad: number;
    estado: string;
    id: number;
    pedidoId: number;
    platoId: number;
    platoNombre: string;
    subtotal: number;
  
    constructor(
      cantidad: number,
      estado: string,
      id: number,
      pedidoId: number,
      platoId: number,
      platoNombre: string,
      subtotal: number
    ) {
      this.cantidad = cantidad;
      this.estado = estado;
      this.id = id;
      this.pedidoId = pedidoId;
      this.platoId = platoId;
      this.platoNombre = platoNombre;
      this.subtotal = subtotal;
    }
  }
  