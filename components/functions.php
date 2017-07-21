<?php 

include('wp-api-lanauva.php');

function beneficios_constructMetaQuery($params){

   $meta_query = array(
        'relation' => 'AND'    
    );

	if(isset($params["title"])){
    	   $meta_query["nombre_del_establecimiento_clause"] = array(
        	            'key'        => 'nombre_del_establecimiento',
            	        'value'        => $params["title"],
                	    'compare'    => 'LIKE'
                	);
   }

   $tax_query  = array(
       'relation' => 'AND'    
   );

   if(isset($params["categoria_del_beneficio"])){
       $tax_query[] = array(
                       'taxonomy' => 'categoria_del_beneficio',
                       'field' => 'ID',
                       'terms' => $params["categoria_del_beneficio"],
                   );
   }
   
   if(isset($params["localidad"])){
       $tax_query[] = array(
                       'taxonomy' => 'localidad',
                       'field' => 'ID',
                       'terms' => $params["localidad"],
               );
   }
    
    return array(
               'meta_query' => $meta_query,
                'tax_query' => $tax_query,
            );
}

function prestaciones_constructMetaQuery($params){

   $meta_query = array(
        'relation' => 'AND'    
    );

	if(isset($params["nombre"])){
    	   $meta_query["nombre_de_la_prestacion_clause"] = array(
        	            'key'        => 'nombre_de_la_prestacion',
            	        'value'        => $params["nombre"],
                	    'compare'    => 'LIKE'
                	);
   }

	if(isset($params["nivel"])){
    	   $meta_query["nivel_administrativo_de_la_prestacion_publica_clause"] = array(
        	            'key'        => 'nivel_administrativo_de_la_prestacion_publica',
            	        'value'        => $params["nivel"],
                	    'compare'    => 'LIKE'
                	);
   }

   $tax_query  = array(
       'relation' => 'AND'    
   );

   if(isset($params["categorias_de_la_prestacion"])){
       $tax_query[] = array(
                       'taxonomy' => 'categorias_de_la_prestacion',
                       'field' => 'ID',
                       'terms' => $params["categorias_de_la_prestacion"],
                   );
   }
   
   if(isset($params["localidad"])){
       $tax_query[] = array(
                       'taxonomy' => 'localidad',
                       'field' => 'ID',
                       'terms' => $params["localidad"],
               );
   }
   
   if(isset($params["comunidad"])){
       $tax_query[] = array(
                       'taxonomy' => 'comunidad',
                       'field' => 'ID',
                       'terms' => $params["comunidad"],
               );
   }
    
    return array(
               'meta_query' => $meta_query,
                'tax_query' => $tax_query,
            );
}


function getCategorias(WP_REST_Request $request){
	$categorias = get_terms( 'categoria_del_beneficio', array(
		'hide_empty' => true,
	) );
	$categorias_filtered = array_map('categoria_del_beneficio_basic',$categorias);
    return new WP_REST_Response( $categorias_filtered );
}


function getCategoriasDeLaPrestacion(WP_REST_Request $request){
	$categoriasdelaprestacion = get_terms( 'categorias_de_la_prestacion', array(
		'hide_empty' => true,
	) );
	$categoriasdelaprestacion_filtered = array_map('categorias_de_la_prestacion_basic',$categoriasdelaprestacion);
    return new WP_REST_Response( $categoriasdelaprestacion_filtered );
}

function getLocalidades(WP_REST_Request $request){
	$localidades = get_terms( 'localidad', array(
		'hide_empty' => true,
	) );
	$localidades_filtered = array_map('localidad_basic',$localidades);
    return new WP_REST_Response( $localidades_filtered );
}

function getComunidades(WP_REST_Request $request){
	$comunidades = get_terms( 'comunidad', array(
		'hide_empty' => true,
	) );
	$comunidades_filtered = array_map('comunidad_basic',$comunidades);
    return new WP_REST_Response( $comunidades_filtered );
}


function categoria_del_beneficio_basic($fields){

   $fields->id = $fields->term_id;
   
   return $fields;
}


function categorias_de_la_prestacion_basic($fields){

   $fields->id = $fields->term_id;
   
   return $fields;
}

function localidad_basic($fields){

   $fields->id = $fields->term_id;
   
   return $fields;
}

function comunidad_basic($fields){

   $fields->id = $fields->term_id;
   
   return $fields;
}


add_action( 'rest_api_init', function () {

	register_rest_route(
			'lanauva/v1', 
			'/categoria_del_beneficio', 
			array(
				'methods' => 'GET',
				'callback' => 'getCategorias',
			)
		);
    
    register_rest_route(
			'lanauva/v1', 
			'/localidad', 
			array(
				'methods' => 'GET',
				'callback' => 'getLocalidades',
			)
		);
    
    register_rest_route(
			'lanauva/v1', 
			'/comunidad', 
			array(
				'methods' => 'GET',
				'callback' => 'getComunidades',
			)
		);
    
    register_rest_route(
			'lanauva/v1', 
			'/categorias_de_la_prestacion', 
			array(
				'methods' => 'GET',
				'callback' => 'getCategoriasDeLaPrestacion',
			)
		);

} );

?>