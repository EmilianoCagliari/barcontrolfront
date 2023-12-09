
export const es_dbtable = {
    product: {
        id : "id",
        name: "nombre",
        price: "precio",
        quantity: "cantidad",
        brand_id: "marca",
        type: "tipo",
        initialWeight: "peso inicial",
        barcode: "codigo de barra",
        createdAt: "creado",
        updatedAt: "actualizado"
    },
    user: {
        id : "id",
        name: "nombre",
        surname: "apellido",
        email: "correo",
        password: "contraseña",
        role: "rol",
        isActive: "activo",
        createdAt: "creado",
        updatedAt: "actualizado"
    },
    brands: {
        id: "id",
        name: "nombre",
        distributor: "distribuidor",
        createdAt: "creado",
        updatedAt: "actualizado"
    },
    weightRegister: {
        id: "id",
        weight: "peso",
        product_id: "producto",
        user_id: "usuario",
        createdAt: "creado",
        updatedAt: "actualizado"
    }
}