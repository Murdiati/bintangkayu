// import React,{useState} from 'react';
import React, { useState, Fragment, useEffect } from 'react';
import { Link } from "react-router-dom";
import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from "reactstrap";
import { Combobox, Transition } from '@headlessui/react'
import "../styles/shop.css";
import "../custom-hooks/useGetData"
import useGetData from "../custom-hooks/useGetData";
// import useGetData from '../custom-hooks/useGetData';
import ProductsList from '../components/UI/ProductsList';

const Shop = () => {

    const { data: productsData, loading } = useGetData('Produk');
    const [selected, setSelected] = useState({})
    const [query, setQuery] = useState('')

    const filteredProducts =
        query === ''
            ? productsData
            : productsData.filter((product) =>
                product.namaProduk
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    // useEffect(
    //     () => {
    //         // let selectedString = JSON.stringify(selected)
    //         console.log(selected)
    //     }, [selected]
    // )

    return (
        <Helmet title="Shop">
            <CommonSection title="Products">
            </CommonSection>

            <section>
                <Container>
                    <Row>
                        <Col lg='12' md='12'>
                            {/* For Search... */}
                            <Combobox value={selected} onChange={setSelected}>
                                <div className="relative mt-1">
                                    <div className="flex flex-row items-center gap-2 relative w-full py-[0.5rem] px-4 cursor-default overflow-hidden rounded-lg bg-slate-100 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-100 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                                        <Combobox.Input
                                            className="
                                            w-full 
                                            border-none 
                                            py-2 
                                            pl-3 
                                            pr-10 
                                            text-sm 
                                            leading-5 
                                            text-gray-900 
                                            focus:outline-0
                                            bg-slate-100
                                            placeholder:text-slate-400
                                            "
                                            placeholder='Cari Produk...'
                                            displayValue={(product) => product.namaProduk}
                                            onChange={(event) => setQuery(event.target.value)}
                                        />
                                        {/* <Combobox.Button> */}
                                        {/* <ChevronUpDownIcon
                                                className="h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            /> */}
                                        <Link
                                            className='ri-search-line text-gray-400 text-[1rem] '
                                            to={'/shop/' + selected.idProduk}
                                            >

                                            </Link>
                                        {/* </Combobox.Button> */}

                                    </div>
                                    <Transition
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                        afterLeave={() => setQuery('')}
                                    >
                                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {filteredProducts.length === 0 && query !== '' ? (
                                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                                    Nothing found.
                                                </div>
                                            ) : (
                                                filteredProducts.map((product) => (
                                                    <Combobox.Option
                                                        key={product.idProduk}
                                                        className={({ active }) =>
                                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                                            }`
                                                        }
                                                        value={product}
                                                    >
                                                        {({ selected, active }) => (
                                                            <>
                                                                <span
                                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                        }`}
                                                                >
                                                                    {product.namaProduk}
                                                                </span>
                                                                {selected ? (
                                                                    <span
                                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                                            }`}
                                                                    >
                                                                        {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Combobox.Option>
                                                ))
                                            )}
                                        </Combobox.Options>
                                    </Transition>
                                </div>
                            </Combobox>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className="pt-0">
                <Container>
                    <Row>
                        <ProductsList />
                    </Row>
                </Container>
            </section>

        </Helmet>
    );
};

export default Shop;
