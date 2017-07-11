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

   $tax_query = array(
        'relation' => 'AND'    
    );

    if(isset($params["categoria_del_beneficio"])){
        $tax_query = array(
                    array (
                        'taxonomy' => 'categoria_del_beneficio',
                        'field' => 'ID',
                        'terms' => $params["categoria_del_beneficio"],
                    )
                );
    }
    
    if(isset($params["localidad"])){
        $tax_query = array(
                    array (
                        'taxonomy' => 'localidad',
                        'field' => 'ID',
                        'terms' => $params["localidad"],
                    )
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

function getLocalidades(WP_REST_Request $request){
	$localidades = get_terms( 'localidad', array(
		'hide_empty' => true,
	) );
	$localidades_filtered = array_map('localidad_basic',$localidades);
    return new WP_REST_Response( $localidades_filtered );
}


function categoria_del_beneficio_basic($fields){

   $fields->id = $fields->term_id;
   
   return $fields;
}

function localidad_basic($fields){

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

} );

?>