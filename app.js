import { supabase } from './supabase.js';

console.log('Supabase conectado correctamente');

async function cargarDatosSupabase() {
    const [productosResult, ventasResult, movimientosResult] = await Promise.all([
        supabase
            .from('productos')
            .select('*')
            .order('id', { ascending: false }),

        supabase
            .from('ventas')
            .select('*')
            .order('id', { ascending: false }),

        supabase
            .from('movimientos')
            .select('*')
            .order('id', { ascending: false })
    ]);

    // Cargar productos
    if (productosResult.error) {
        console.error(
            'Error leyendo productos:',
            productosResult.error
        );
    } else {
        window.dispatchEvent(
            new CustomEvent('productosSupabaseCargados', {
                detail: productosResult.data || []
            })
        );
    }

    // Cargar ventas
    if (ventasResult.error) {
        console.error(
            'Error leyendo ventas:',
            ventasResult.error
        );
    } else {
        window.dispatchEvent(
            new CustomEvent('ventasSupabaseCargadas', {
                detail: ventasResult.data || []
            })
        );
    }

    // Cargar movimientos
    if (movimientosResult.error) {
        console.error(
            'Error leyendo movimientos:',
            movimientosResult.error
        );
    } else {
        window.dispatchEvent(
            new CustomEvent('movimientosSupabaseCargados', {
                detail: movimientosResult.data || []
            })
        );
    }
}

cargarDatosSupabase();