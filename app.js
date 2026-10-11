import { supabase } from './supabase.js';

console.log('Supabase conectado correctamente');

// Evita procesar dos veces el mismo evento
let cargandoDatos = false;

// Carga los datos desde Supabase
async function cargarDatosSupabase() {
    if (cargandoDatos) return;

    cargandoDatos = true;

    try {
        const [
            productosResult,
            ventasResult,
            movimientosResult
        ] = await Promise.all([
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
    } catch (error) {
        console.error('Error cargando datos:', error);
    } finally {
        cargandoDatos = false;
    }
}

// Primera carga al abrir la aplicación
cargarDatosSupabase();

// Configurar la sincronización en tiempo real
const canalTiempoReal = supabase
    .channel('sincronizacion-logistica')

    .on(
        'postgres_changes',
        {
            event: '*',
            schema: 'public',
            table: 'productos'
        },
        () => {
            console.log('Cambio detectado en productos');
            cargarDatosSupabase();
        }
    )

    .on(
        'postgres_changes',
        {
            event: '*',
            schema: 'public',
            table: 'ventas'
        },
        () => {
            console.log('Cambio detectado en ventas');
            cargarDatosSupabase();
        }
    )

    .on(
        'postgres_changes',
        {
            event: '*',
            schema: 'public',
            table: 'movimientos'
        },
        () => {
            console.log('Cambio detectado en movimientos');
            cargarDatosSupabase();
        }
    )

    .subscribe((estado) => {
        console.log('Estado de sincronización:', estado);
    });

// Permite comprobar el estado desde la consola
window.canalTiempoReal = canalTiempoReal;