import puppeteer from "puppeteer";

import { CrearFacturaDTO, FacturaTemplate, FacturasDTO } from "../dtos/factura.dto";
import { models } from "../models/index.model";
import { productoPorId } from "./producto.service";
import { compileHbs } from "../utils/handleHbs";

const todosFacturas = async () => {
  try {
    return await models.Facturas.findAll();
  } catch (error) {
    throw new Error(`[SERVICE]: ${error}`);
  }
};

const facturaPorId = async (id: number) => {
  try {
    const factura = await models.Facturas.findByPk(id, {
      include: [
        {
          model: models.Clientes,
          as: "cliente",
        },
        {
          model: models.FacturasProductos,
          as: "productos",
          include: [
            {
              model: models.Productos,
              as: "producto",
            }
          ]
        },
      ],
    });
    if(!factura) {
      throw new Error('Fcatura does not exist')
    }

    return factura
  } catch (error) {
    throw new Error(`[SERVICE]: ${error}`);
  }
};

const clientePorFactura = async (id: number) => {
  try {
    const factura = <FacturasDTO>await models.Facturas.findByPk(id, {
      include: [
        {
          model: models.Clientes,
          as: "cliente",
        },
      ],
    });
    if(!factura) {
      throw new Error('Factura does not exist')
    }

    return factura.cliente;
  } catch (error) {
    throw new Error(`[SERVICE]: ${error}`);
  }
};

const productosPorFactura = async (id: number) => {
  try {
    const factura = <FacturasDTO>await models.Facturas.findByPk(3, {
      include: [
        {
          model: models.FacturasProductos,
          as: "productos",
          include: [
            {
              model: models.Productos,
              as: "producto",
            }
          ]
        },
      ],
    });
    if(!factura) {
      throw new Error('Factura does not exist')
    }

    return factura.productos;
  } catch (error) {
    throw new Error(`[SERVICE]: ${error}`);
  }
};

const guardarFactura = async (body: CrearFacturaDTO) => {
  try {
    const { clienteId, productos, cantidad } = body;
    let total = 0;

    for (let i = 0; i < productos.length; i++) {
      const producto = await productoPorId(productos[i]);
      if (!producto) {
        throw new Error("Producto no registrado");
      }

      const totalProducto = producto.precio * cantidad[i];
      if (producto.iva === 0) {
        total += totalProducto;
      } else {
        total += (totalProducto * producto.iva) / 100 + totalProducto;
      }
      producto.stock = producto.stock - cantidad[i];
      await producto.save();
    }

    const factura = await models.Facturas.create({ clienteId, total });

    for (let i = 0; i < productos.length; i++) {
      await models.FacturasProductos.create({
        facturaId: factura.id,
        productoId: productos[i],
        cantidad: cantidad[i],
      });
    }

    return factura;
  } catch (error) {
    throw new Error(`[SERVICE]: ${error}`);
  }
};

const imprimirTemplate = async (id: number) => {
  try {
    const factura = <FacturasDTO>await facturaPorId(id);
    const data: FacturaTemplate = {
      nombre: factura.cliente.nombre,
      cedula: factura.cliente.cedula,
      celular: factura.cliente.celular,
      direccion: factura.cliente.direccion,
      total: factura.total,
      productos: factura.productos.map((prod) => {
        const producto = prod.producto;
        return {
          ...producto.dataValues,
          cantidad: prod.cantidad,
          valor: (producto.precio + producto.iva*producto.precio/100) * prod.cantidad
        }
      }),
    };
    const browser = await puppeteer.launch({
      args: [
        "--disable-setuid-sandbox",
        "--no-sandbox",
        "--single-process",
        "--no-ygote"
      ],
      executablePath:
      process.env.NODE_ENV==="production" ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath()
    });
    const page = await browser.newPage();
    const content = await compileHbs(data);
    console.log("datos: ", data, "contenido: ", content)

    await page.setContent(content);
    await page.emulateMediaType('screen');
    const pdfBuffer = await page.pdf({
      format: 'A4',
    });

    await page.close()
    return {
      pdfBuffer,
      filename: `facturaElectronica_${factura.cliente.nombre}.pdf`
    }

  } catch (error) {
    throw new Error(`[SERVICE]: ${error}`);
  }

}

export {
  todosFacturas,
  facturaPorId,
  clientePorFactura,
  productosPorFactura,
  guardarFactura,
  imprimirTemplate
};
