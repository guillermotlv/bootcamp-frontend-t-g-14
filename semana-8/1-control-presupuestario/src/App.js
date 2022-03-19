
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Egresos from './components/Egresos';
import Footer from './components/Footer';
import FormEgreso from './components/FormEgreso';
import FormPresupuesto from './components/FormPresupuesto';
import Header from './components/Header';

function App() {

  const [presupuesto, setPresupuesto] = useState(0);
  const [restante, setRestante] = useState(0);
  const [showFormPresupuesto, setShowFormPresupuesto] = useState(true);
  const [egreso, setEgreso] = useState({});
  const [egresos, setEgresos] = useState([]);

  useEffect(() => {
    if (Object.keys(egreso).length > 0) {

      setRestante(restante - egreso.valor);
      setEgresos([
        ...egresos,
        egreso
      ]);

      if (restante - egreso.valor < 0) {
        Swal.fire({
          position: 'center',
          title: 'Su egreso supera al presupuesto.',
          text: 'Se registrará como restante negativo.',
          icon: 'warning',
          confirmButtonText: 'Aceptar',
          timer: 3000,
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        });
      }
    }
  }, [egreso]);

  const company = {
    name: '💸Monederito Estofado 2022💸',
    slogan: '💰Si quieres ser estofado, paga por adelantado💰'
  };

  const credits = {
    author: 'Elliot Garamendi',
    currentYear: new Date().getFullYear()
  };

  return (
    <>
      <Header
        company={company}
      />

      <main className='main'>
        <section className='container'>
          <div className='row'>
            <section className='col-md-12'>
              <div className='contenido-principal animate__animated animate__fadeIn'>
                {
                  showFormPresupuesto
                    ?
                    (
                      <FormPresupuesto
                        setPresupuesto={setPresupuesto}
                        setRestante={setRestante}
                        setShowFormPresupuesto={setShowFormPresupuesto}
                      />
                    )
                    :
                    (
                      <>
                        <div className='row gap-4 justify-content-around'>
                          <section className='col-md-5 animate__animated animate__fadeInLeft'>
                            <FormEgreso
                              setEgreso={setEgreso}
                            />
                          </section>
                          <section className='col-md-5 animate__animated animate__fadeInRight'>
                            <Egresos
                              presupuesto={presupuesto}
                              restante={restante}
                              egresos={egresos}
                            />
                          </section>
                        </div>
                      </>
                    )
                }
              </div>
            </section>
          </div>
        </section>
      </main>

      <Footer
        credits={credits}
      />
    </>
  );
}

export default App;
