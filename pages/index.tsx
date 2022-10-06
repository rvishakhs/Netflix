
import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import Row from '../components/Row'
import { Movie } from '../typing'
import requests from '../utils/requests'
import {
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { modalState, movieState } from '../atom/modalatom'
import Modal from '../components/Modal'
import useAuth from '../hooks/useAuth';
import Plans from '../components/Plans'
import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import payments from '../lib/stripe'
import { useEffect, useState } from 'react'
import login from './login'
import useSubscription from '../hooks/useSubscription'
import useList from '../hooks/useList'



interface props {
    netflixOrginals : Movie[]
    trendingNow : Movie[]
    topRated : Movie[]
    actionMovies : Movie[]
    comedyMovies : Movie[]
    horrerMovies : Movie[]
    romanceMovies : Movie[]
    documentaries : Movie[]
    products : Product[]
}

const Home = ({
    netflixOrginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrerMovies,
    romanceMovies,
    documentaries,
    products,
  }: props) => {

    
  const modalstate = useRecoilValue(modalState)
  const {loading, user} = useAuth()
  const subscribed = useSubscription(user)
  const [movie, setMovie] = useRecoilState(movieState)
  const list = useList(user?.uid)

  


  if (loading || subscribed === null ) return null 

  if (!subscribed) {
    return  <Plans products={products}/>
  }


  

  return (
    <div className="related h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
      <Head>
        <title>Netflix </title>
        <link rel="icon" href="https://cdn.iconscout.com/icon/free/png-256/netflix-3521600-2945044.png" />
      </Head>
      {/* Header Section */}
      <Header/>
      {/* Main section */}
      <main className='relative pl-6 pb-24 lg:space-y-24 lg:pl-12'>
        <Banner netflixOrginals = {netflixOrginals} />
        <section className='md:space-y-20'>
          <Row tittle="Trending Now " movies={trendingNow} />
          <Row tittle="Top Rated " movies={topRated} />
          <Row tittle="Action Thrillers " movies={actionMovies} />
          <Row tittle="Comedies " movies={comedyMovies} />
          <Row tittle="Scary Movies " movies={horrerMovies} />
          <Row tittle="Romantic Movies " movies={romanceMovies} />
          <Row tittle="Documentaries " movies={documentaries} />
          {list.length > 0 && 
            <Row tittle='My List' movies={list} />
          }
        </section>
      </main>
      {/* Modal section */}

      {modalstate && <Modal />}

    </div>
  )
}

export default Home

export const getServerSideProps = async () => {

    const products = await getProducts(payments,{
      includePrices:true,
      activeOnly:true,
    })

    .then((res) => res)
    .catch((err) => console.log(err.message))

  const [
    netflixOrginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrerMovies,
    romanceMovies,
    documentaries
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ])

  return {
    props : {
      netflixOrginals : netflixOrginals.results,
      trendingNow : trendingNow.results,
      topRated : topRated.results,
      actionMovies : actionMovies.results,
      comedyMovies : comedyMovies.results,
      horrerMovies : horrerMovies.results,
      romanceMovies : romanceMovies.results,
      documentaries : documentaries.results,
      products,
    }
  }

}