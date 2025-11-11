      <div className="container my-5">
        {/* Contenedor principal con scroll y padding */}
        <div className="bg-black rounded-3 overflow-hidden p-3  bg-light shadow-sm">
          <div className="d-flex gap-3  overflow-x-auto pb-3 " style={{
            // Solo esta línea es "CSS extra" (opcional para barra más bonita)
            scrollbarWidth: 'thin',
          }}
          >


            {/* === COLUMNA 1: Appearances === */}
            <div className="flex-shrink-01" style={{ minWidth: '150px' }}>
              {/* Título */}
              <div className="text-uppercase small fw-semibold text-secondary mb-2">
                Appearances
              </div>
              {/* Contenido */}
              <ul className="list-unstyled small text-light mb1-0">
                {apariciones.map((ele) => (
                  <li className="text-break text1-wrap" style={{ wordWrap: 'break-word' }}>Star Wars: Episodio {ele.episode_id} {ele.title}</li>
                ))}
              </ul>
            </div>

            {/* === COLUMNA 2: Affiliations === */}
            <div className="flex-shrink-0 border-start border-secondary ps-4" style={{ minWidth: '130px' }}>
              <div className="text-uppercase small fw-semibold text-secondary mb-2">
                Affiliations
              </div>
              <ul className="list-unstyled small text-light mb-0">
                <li>Rebel Alliance,</li>
                <li>Jedi Order</li>
              </ul>
            </div>

            {/* === COLUMNA 3: Locations === */}
            <div className="flex-shrink-0 border-start border-secondary ps-4" style={{ minWidth: '130px' }}>
              <div className="text-uppercase small fw-semibold text-secondary mb-2">
                Locations
              </div>
              <ul className="list-unstyled small text-light mb-0">
                <li>Polis Massa,</li>
                <li>Lars Moisture Farm,</li>
                <li>Tatooine</li>
              </ul>
            </div>

            {/* === COLUMNA 4: Gender === */}
            <div className="flex-shrink-0 border-start border-secondary ps-4" style={{ minWidth: '90px' }}>
              <div className="text-uppercase small fw-semibold text-secondary mb-2">
                Gender
              </div>
              <div className="small text-light">Male</div>
            </div>

            {/* === COLUMNA 5: Dimensions === */}
            <div className="flex-shrink-0 border-start border-secondary ps-4" style={{ minWidth: '110px' }}>
              <div className="text-uppercase small fw-semibold text-secondary mb-2">
                Dimensions
              </div>
              <div className="small text-light">Height: 1.72m</div>
            </div>

            {/* === COLUMNA 6: Species === */}
            <div className="flex-shrink-0 border-start border-secondary ps-4" style={{ minWidth: '90px' }}>
              <div className="text-uppercase small fw-semibold text-secondary mb-2">
                Species
              </div>
              <div className="small text-light">Human</div>
            </div>

            {/* === COLUMNA 7: Vehicles === */}
            <div className="flex-shrink-0 border-start border-secondary ps-4" style={{ minWidth: '150px' }}>
              <div className="text-uppercase small fw-semibold text-secondary mb-2">
                Vehicles
              </div>
              <ul className="list-unstyled small text-light mb-0">
                <li>T-16 Skyhopper,</li>
                <li>X-34 Landspeeder,</li>
                <li>X-wing Starfighter,</li>
                <li>Snowspeeder</li>
              </ul>
            </div>

            {/* === COLUMNA 8: Weapons === */}
            <div className="flex-shrink-0 border-start border-secondary ps-4" style={{ minWidth: '170px' }}>
              <div className="text-uppercase small fw-semibold text-secondary mb-2">
                Weapons
              </div>
              <ul className="list-unstyled small text-light mb-0">
                <li>Lightsaber,</li>
                <li>Blaster Pistol,</li>
                <li>Luke Skywalker's Lightsaber (Green Blade),</li>
                <li>Anakin, Luke, and Rey's Lightsaber</li>
              </ul>
            </div>

            {/* === COLUMNA 9: Tool === */}
            <div className="flex-shrink-0 border-start border-secondary ps-4" style={{ minWidth: '130px' }}>
              <div className="text-uppercase small fw-semibold text-secondary mb-2">
                Tool
              </div>
              <ul className="list-unstyled small text-light mb-0">
                <li>Bacta Tank,</li>
                <li>Moisture Vaporator</li>
              </ul>
            </div>

          </div>
        </div>
      </div>