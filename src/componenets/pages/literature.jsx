import React from "react";
import Navbar from "../common/navbar";

import Footer from "../common/footer";
import "../css/style.css";

const Literature = () => {
  return (
    <div className="wrapper">
      <Navbar />
      <div class="d-flex p-3 mb-5">
        <div class="overflow-auto">
          <div className="row">
            <div className="col-12 col-md-6">
              <div class="card m-2" style={{ maxWidth: "500px" }}>
                <a
                  href={
                    "https://www.planetebook.com/free-ebooks/paradise-lost.pdf"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  class="row g-0"
                >
                  <div class="col-md-4">
                    <img
                      src={"/dist/img/paradise-lost.png"}
                      class="img-fluid rounded-start"
                    />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title mb-2" style={{ color: "black" }}>
                        Paradise Lost
                      </h5>
                      <p
                        class="card-text"
                        style={{
                          textAlign: "justify",
                          fontSize: 13,
                          color: "black",
                        }}
                      >
                        The poem delves into themes of free will, temptation,
                        and the consequences of disobedience. Through eloquent
                        verse, Milton examines the complexities of human nature
                        and the eternal struggle between good and evil.
                      </p>
                      <p class="card-text">
                        <small class="text-muted">By John Milton</small>
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div class="card m-2" style={{ maxWidth: "540px" }}>
                <a
                  href={
                    "https://www.planetebook.com/free-ebooks/around-the-world-in-80-days.pdf"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  class="row g-0"
                >
                  <div class="col-md-4">
                    <img
                      src={"/dist/img/around-the-world.png"}
                      class="img-fluid rounded-start"
                    />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title mb-2" style={{ color: "black" }}>
                        Around the World in 80 Days
                      </h5>
                      <p
                        style={{
                          textAlign: "justify",
                          fontSize: 13,
                          color: "black",
                        }}
                      >
                        Accompanied by his resourceful servant, Passepartout,
                        Fogg encounters various challenges and adventures as he
                        races against time and unforeseen obstacles. The novel
                        is a thrilling journey that combines elements of
                        suspense, humor, and exploration, showcasing Verne's
                        imaginative storytelling.
                      </p>
                      <p class="card-text">
                        <small class="text-muted">By Jules Verse</small>
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <div class="card m-2" style={{ maxWidth: "500px" }}>
                <a
                  href={
                    "https://www.planetebook.com/free-ebooks/the-time-machine.pdf"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  class="row g-0"
                >
                  <div class="col-md-4">
                    <img
                      src={"/dist/img/time-machine.png"}
                      class="img-fluid rounded-start"
                    />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title" style={{ color: "black" }}>
                        The Time Machine
                      </h5>
                      <p
                        class="card-text"
                        style={{
                          textAlign: "justify",
                          fontSize: 13,
                          color: "black",
                        }}
                      >
                        The novel explores themes of social inequality, the
                        nature of time, and the consequences of unchecked
                        technological progress. Wells' work is a pioneering
                        example of time travel fiction, sparking discussions
                        about the implications of time manipulation and its
                        impact on human civilization.
                      </p>
                      <p class="card-text">
                        <small class="text-muted">By H.G. Wells</small>
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div class="card m-2" style={{ maxWidth: "540px" }}>
                <a
                  href={
                    "https://www.planetebook.com/free-ebooks/bleak-house.pdf"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  class="row g-0"
                >
                  <div class="col-md-4">
                    <img
                      src={"/dist/img/black-house.png"}
                      class="img-fluid rounded-start"
                    />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title mb-2" style={{ color: "black" }}>
                        Bleack House
                      </h5>
                      <p
                        class="card-text"
                        style={{
                          textAlign: "justify",
                          fontSize: 13,
                          color: "black",
                        }}
                      >
                        As he delves deeper into the mystery, Sawyer discovers a
                        malevolent force and a parallel world known as "The
                        Territories." The novel combines elements of horror,
                        fantasy, and crime fiction, weaving a complex narrative
                        that explores the intersections of reality and the
                        supernatural.
                      </p>
                      <p class="card-text">
                        <small class="text-muted">
                          By Stephen King and Peter Straub
                        </small>
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Literature;
