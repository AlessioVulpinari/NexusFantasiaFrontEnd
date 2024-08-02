import { Container } from "react-bootstrap"
import Image from "react-bootstrap/Image"

const HeroSection = () => {
  return (
    <>
      <div>
        <Image src='/public/assets/background.jpg' alt='red-background-d20' fluid />
      </div>

      <Container>
        <div className='mt-2 d-flex flex-column justify-content-center text-center'>
          <h1>NexusFantasia la tua wiki a portata di dado!</h1>
          <p>Il portale completamente in italiano per la creazione delle tue schede personaggio di Dnd 5e.</p>
        </div>

        <div className='card my-3 border border-0'>
          <div className='row g-0'>
            <div className='col-md-4'>
              <img src='/public/assets/party.jpg' className='img-fluid' alt='...' />
            </div>
            <div className='col-md-8 d-flex align-items-center text-center'>
              <div className='card-body'>
                <h5 className='card-title'>Classi e sottoclassi</h5>
                <p className='card-text'>
                  Tutte le informazioni di cui potreste avere bisogno per scegliere la classe giusta per voi!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='card my-3 border border-0'>
          <div className='row g-0'>
            <div className='col-md-4'>
              <img src='/public/assets/races.jpg' className='img-fluid' alt='...' />
            </div>
            <div className='col-md-8 d-flex align-items-center text-center'>
              <div className='card-body'>
                <h5 className='card-title'>Razze</h5>
                <p className='card-text'>Puoi essere qualsiasi cosa tu voglia ad ogni momento!</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default HeroSection
