import { Button, Card, Container, Grid, Text,Image } from '@nextui-org/react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts'
import {  Pokemon} from '../../interfaces';


interface  Props {
     pokemon:Pokemon

}

const PokemonPage : NextPage<Props> = ({pokemon}) => {

   const router = useRouter();
//   console.log(router.query);
//   console.log(pokemon);
    return (
        
     <Layout title="Pokemon">
          
    <Grid.Container css={{marginTop:'5px'}} gap={2}> 
       
     <Grid xs={12} sm={4} >
   <Card hoverable={true} css={{padding:'30px'}}>
        <Card.Body>
             <Card.Image  src={pokemon.sprites.other?.dream_world.front_default || '/no-image'} alt={pokemon.name} width="100%" height={200}/>
        </Card.Body> 
   </Card>
     </Grid>

     <Grid xs={12} sm={8} >
   <Card>
        <Card.Header css={{display: 'flex', justifyContent: 'space-between'}}>
           <Text h1 transform="capitalize">{pokemon.name}</Text>
           <Button color="gradient">
             Saved in Favorites
           </Button>
        </Card.Header>
        <Card.Body>
             <Text size={10}>Sprites : </Text>
              <Container direction='row' display="flex" gap={0}>
                  <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={100} height={100}/> 

                  <Image src={pokemon.sprites.back_default} alt={pokemon.name} width={100} height={100}/> 

                  <Image src={pokemon.sprites.front_shiny} alt={pokemon.name} width={100} height={100}/> 

                  <Image src={pokemon.sprites.back_shiny} alt={pokemon.name} width={100} height={100}/> 
              </Container>
        </Card.Body>
   </Card>
     </Grid>


    </Grid.Container>

     </Layout>
  )
}

export const getStaticPaths: GetStaticPaths =async (ctx) =>{

     const pokemoon151 = [...Array(151)].map((value,index) =>  `${index +1 }`);

     // console.log(pokemoon151);

     return {
           paths : pokemoon151.map(id =>({ params : { id}})),
          fallback :false 
     }
}


export const getStaticProps : GetStaticProps = async({params}) =>{
    
    const {id} = params as {id:string};
     const {data} = await  pokeApi.get<Pokemon>(`/pokemon/${id}`);
      
     return {
        props: {
          pokemon : data
        }
     }
  }

export default PokemonPage