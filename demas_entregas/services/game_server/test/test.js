var chai = require('chai')
    , chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = require('chai').expect;
const {app} = require('../src/index')

const server = app;


describe("Tests", () => {
    describe("E2E", () => {
        // Test to get all students record
        it("Test Hola Mundo", (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    done();
                });
        });

        it("Nuevo Juego", (done) => {
            chai.request(server)
                .get('/new-game')
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res).to.be.json
                    expect(res.body).to.be.eql({
                        h: 80,
                        w: 60,
                        player: {
                            alive: true,
                            position: {
                                x: 30,
                                y: 1
                            }
                        },
                        playing: true,
                        bullets: [],
                        enemies: [
                            {
                                alive: true,
                                position: {
                                    x: 30,
                                    y: 80
                                }
                            }
                        ],
                    })
                    done();
                });
        });

        it("Move", (done) => {
            chai.request(server)
                .post('/move')
                .send({
                    h: 2,
                    w: 2,
                    player: {
                        alive: true,
                        position: {
                            x: 1,
                            y: 1
                        }
                    },
                    playing: true,
                    bullets: [],
                    enemies: [],
                    input: {
                        x: 1,
                        y: 1
                    }
                })
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res).to.be.json
                    expect(res.body).to.be.eql({
                        h: 2,
                        w: 2,
                        player: {
                            alive: true,
                            position: {
                                x: 2,
                                y: 2
                            }
                        },
                        playing: true,
                        bullets: [],
                        enemies: [],
                    })
                    done();
                });
        });

        it("Move Border", (done) => {
            chai.request(server)
                .post('/move')
                .send({
                    h: 2,
                    w: 2,
                    player: {
                        alive: true,
                        position: {
                            x: 0,
                            y: 0
                        }
                    },
                    playing: true,
                    bullets: [],
                    enemies: [],
                    input: {
                        x: -1,
                        y: -1
                    }
                })
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res).to.be.json
                    expect(res.body).to.be.eql({
                        h: 2,
                        w: 2,
                        player: {
                            alive: true,
                            position: {
                                x: 0,
                                y: 0
                            }
                        },
                        playing: true,
                        bullets: [],
                        enemies: [],
                    })
                    done();
                });
        });
    })
})