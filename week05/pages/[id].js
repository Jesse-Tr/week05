import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import {getAllIds, getData } from '../lib/data';


// create an instance of the getSTatic Props() to return data for one person
export async function getStaticProps({params}){
  const itemData = await getData(params.id);
  return {
    props: {
      itemData
    }
  };
}
//create an instance of the getStaticPaths() to report to next all possible dynamic urls
export async function getStaticPaths(){
  const paths = getAllIds();
  return {
    paths,
    fallback:false
    
  };
}

//make a react component to disoplay all the details about a person when a dynamic route matches

export default function Entry ({itemData}){
  return(
    <Layout>
    {/* render details about one enitity in persons.json saved in itemData.*/}
  <article className="card col-6">
  <h2> Person Detail</h2>
  <div className = "card-body">
  <h5 className="card-title">{itemData.name}</h5>
  <h6 className="card-subtitle mb-2 text-muted">{itemData.phone}</h6>
    <a href= {'mailto:' + itemData.email} className="card-link">{itemData.email}</a>
  </div>
  </article>
  {/* render details about all other entitites in person.json realted to id*/}
  <div className="list-group col-6">
  {itemData.related ?
  <h2> realted person</h2> : null}
    {/* check for existence of itemData.related property*/}
    {itemData.related ?
        itemData.related.map(
        ({id, name}) => (
          <Link key = {id} href = {`/${id}`}>
          <a className="list-group-item list-group-item-action">{name}</a>
          </Link>
        )
      )
    : null }
    
    {/* using expression  ? ... : null*/}
  </div>
  </Layout>
  );
  
}

