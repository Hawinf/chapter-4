import React, { useState, useEffect, useRef } from "react";
// import "react-router-dom/dist/dom";
import { Link } from "react-router-dom";
import Axios from "axios";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./style.css";

const CariMobil = () => {
  const [cars, setCars] = useState([]);
  const [inputSample, setInputSample] = useState("");
  // const [profile, setProfile] = useState({});
  const [test, setTest] = useState("test");

  // const dataCars = [
  //     {
  //         id: 802,
  //         category: 4,
  //         createdAt: '2022-09-30T14:32:02.159Z',
  //         finish_rent_at: null,
  //         image: 'https://picsum.photos/id/1019/270/160',
  //         name: 'Innova',
  //         price: 50000,
  //         start_rent_at: null,
  //         status: true,
  //         updatedAt: null,
  //         description: 'lorem ipsum dollar amet'
  //     },
  //     {
  //         id: 20,
  //         category: 3,
  //         createdAt: '2022-08-30T14:32:02.159Z',
  //         finish_rent_at: null,
  //         image: 'https://picsum.photos/id/1019/270/160',
  //         name: 'Pajero',
  //         price: 50000,
  //         start_rent_at: null,
  //         status: true,
  //         updatedAt: null,
  //         description: 'lorem ipsum dollar amet'
  //     }
  // ];

  // const getCars = () => {
  //     fetch('https://bootcamp-rent-car.herokuapp.com/admin/car')
  //         .then((response) => response.json())
  //         .then((data) => setCars(dataCars));
  // }
  const baseUrl = "http://localhost:4000";

  const getCars = () => {
    Axios.get(`${baseUrl}/cars`)
      .then((response) => {
        const descending = response.data.sort((a, b) => b.id - a.id);
        setCars(descending);
      })
      .catch((error) => console.log(error));
  };

  // const getProfile = () => {

  //     axios
  //         .get(`${baseUrl}/profile`)
  //         .then((response) => {
  //         setProfile(response.data)
  // })
  //         .catch((error) => console.log(error));
  //         // console.log(response)
  // };

  // const fetch = useRef(true);

  // useEffect(() => {
  //     if(fetch.current){
  //         fetch.current = false
  //     getCars();
  //     // getProfile()
  //     // console.log(cars)
  // }
  // },[]);

  const submitData = (e) => {
    e.preventDefault();
    // Axios.post('https://testapi.org/post', {name: 'John Doe'});
    console.log("input sample =", inputSample);

    const formData = {
      name: inputSamplePost.current.value,
      category: 6,
      price: 7290,
      status: true,
      start_rent_at: "2040-07-03T03:00:07.869Z",
      finish_rent_at: "2002-02-26t87:56:36.523Z",
      image: "http://loremflicker.com/648/480/?random=1",
      createdAt: "2097-04-15T17:34:37.2482",
      updatedAt: "2019-18-28T13:24:33.1322",
      description: "odio",
    };

    Axios.post(`${baseUrl}/cars`, formData)
      .then((response) => {
        if (response) {
          getCars();
          inputSamplePost.current.value = null;
        }
        // console.log(response)
        // setCars(response.data)
      })
      .catch((error) => console.log(error));
  };

  const submitEditData = () => {
    const formData = {
      name: "Mazda 3",
      category: 6,
      price: 7290,
      status: false,
      start_rent_at: "2040-07-03T03:00:07.869Z",
      finish_rent_at: "2002-02-26t87:56:36.523Z",
      image: "http://loremflicker.com/648/480/?random=1",
      createdAt: "2097-04-15T17:34:37.2482",
      updatedAt: "2019-18-28T13:24:33.1322",
      description: "odio",
    };

    Axios.put(
      `${baseUrl}/cars/${inputSampleEdit.current.value}`,
      formData
    ).then((response) => {
      if (response) {
        getCars();
        inputSampleEdit.current.value = null;
      }
    });
  };

  const submitDeleteData = () => {
    Axios.delete(`${baseUrl}/cars/${inputSampleDelete.current.value}`).then(
      (response) => {
        if (response) {
          getCars();
          inputSampleDelete.current.value = null;
        }
      }
    );
  };

  const namaMobil = useRef();
  const category = useRef();
  const harga = useRef();
  const statusOrder = useRef();

  const getData = (e) => {
    e.preventDefault();
    console.log("nama", namaMobil.current.value);
    console.log("kategori", category.current.value);
    console.log("harga", harga.current.value);
    console.log("status", statusOrder.current.value);

    Axios.get(
      `${baseUrl}/cars?name=${namaMobil.current.value}&category=${category.current.value}&price=${harga.current.value}&status=${statusOrder.current.value}`
    )
      .then((response) => {
        if (response) {
          console.log(response.data);
        }
      })
      .catch((error) => console.log(error));
  };

  const inputSamplePost = useRef();
  const inputSampleEdit = useRef();
  const inputSampleDelete = useRef();

  

  return (
    <div className="carimobil">
      <div className="container">
        <div className="row">
          {cars.map((car, index) => {
            return (
              <div className="col-lg-3" key={index}>
                <div className="card">
                  <div className="card-thumbnail">
                    <img src={car.image} alt="" />
                  </div>
                  <div className="card-description">
                    <h3>{car.name}</h3>
                    <p>Rp. {car.price} / Hari</p>
                    <p>{car.description}</p>
                  </div>
                  <Link
                    className="btn btn-success"
                    to={`/cari-mobil/${car.id}`}
                  >
                    Pilih Mobil
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="col">
          <form className="form d-flex" onSubmit={getData}>
            <div className="d-flex mb-4">
              <label
                className="mr-2 d-block"
                htmlFor=""
                style={{ marginBottom: 10 }}
              >
                Nama Mobil
              </label>
              <input type="text" classname="px-2" ref={namaMobil} />
            </div>
            <div className="d-flex mb-4">
              <label className="mr-2" htmlFor="" style={{ marginBottom: 10 }}>
                Kategory
              </label>
              <select ref={category}>
                <option />
                <option value="4">2 - 4 Orang</option>
                <option value="6">4 - 6 Orang</option>
                <option value="8">6 - 8 Orang</option>
              </select>
            </div>

            <div className="d-flex mb-4">
              <label className="mr-2" htmlFor="" style={{ marginBottom: 10 }}>
                Harga
              </label>
              <select ref={harga}>
                <option />
                <option value="400">Rp. 400.000</option>
                <option value="500">Rp. 500.000</option>
                <option value="800">Rp. 800.000</option>
              </select>
            </div>

            <div className="d-flex mb-4">
              <label className="mr-2" htmlFor="" style={{ marginBottom: 10 }}>
                Status
              </label>
              <select ref={statusOrder}>
                <option />
                <option value="true">Tersedia</option>
                <option value="false">Disewa</option>
              </select>
            </div>

            <button className="btn btn-success" type="submit">
              Submit
            </button>
          </form>
        </div>

        {/* <form className="form d-flex flex-column" onSubmit={submitData}>
                    <label htmlFor="">Input Data</label>
                    <div className="d-inline-flex">
                        <input type="text" classname="px-2" ref={inputSamplePost} />
                        
                        <button className="btn btn-success" type="submit">Submit</button>
                    </div>
                </form> */}

        {/* <div className="form d-flex flex-column">
                    <label htmlFor="" style={{ marginBottom: 10 }} >
                    Edit Data Object Base on ID 
                    </label>
                    <div className="d-inline-flex">
                        <input type="number" classname="px-2" ref={inputSampleEdit} />
                        <button
                            style={{marginLeft: 10}}
                            className="btn btn-success"
                            type="button"
                            onClick={submitEditData} >
                                Submit
                            </button>
                    </div>
                </div> */}

        {/* <div className="form d-flex flex-column">
                    <label htmlFor="" style={{ marginBottom: 10 }} >
                    Delete Data Object Base on ID 
                    </label>
                    <div className="d-inline-flex">
                        <input type="number" classname="px-2" ref={inputSampleDelete} />
                        <button
                            style={{marginLeft: 10}}
                            className="btn btn-success"
                            type="button"
                            onClick={submitDeleteData} >
                                Submit
                            </button>
                    </div>
                </div> */}
      </div>
    </div>
  );
};

export default CariMobil;