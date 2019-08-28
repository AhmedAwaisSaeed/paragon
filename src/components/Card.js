
import React from 'react';
import {View} from 'react-native';

const Card = (props) =>{

    return (
        <View style={styles.ContainerStyle}>
            {props.children}
        </View>
    );

};

const styles = { 

ContainerStyle:{

    borderWidth:2,
    borderRadius:2,
    borderColor:"#ddd",
    borderBottomWidth:0,
    shadowColor:'#000',
    shadowOffset:{height:2,widht:0},
    shadowOpacity:0.2,
    shadowRadius:2,
    elevation:1,
    marginLeft:5,
    marginRight:5,
    marginTop:5


}


};


export default Card;