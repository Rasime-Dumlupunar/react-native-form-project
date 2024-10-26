import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Formik } from 'formik';
import { Button, Input, Toggle } from '@ui-kitten/components';
import * as Yup from 'yup';


const FormikYup = () => {

    const registerSchema = Yup.object().shape({
        name: Yup.string().required('Zorunlu Alan'),
        surname: Yup.string().required('Zorunlu Alan'),
        email: Yup.string().required('Zorunlu Alan').email("Lütfen geçerli bir email adresi giriniz.!!"),
        phone: Yup.string()
        .required('Zorunlu Alan')
        .min(11, 'Lütfen minimum  11 haneli bir rakam giriniz.!!')
        .max(13, 'Lütfen max 13 hane olarak giriniz.!!'),
        password: Yup.string().required('Zorunlu Alan').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,50}$/, 'Şartlar sağlanmıyor'),
        passwordConfirm: Yup.string()
        .required('Zorunlu Alan')
        .oneOf([Yup.ref('password')], 'Şifreler uyuşmuyor'),
        agrementConfirm: Yup.bool().required('Zorunlu Alan').oneOf([true], 'Sözleşmeyi onaylamanız gerekiyor.!!'),
        
});
  return (
    <View style={styles.container}>
        <View style={{padding: 20, 
        backgroundColor: '#FFAA01', 
        minHeight: 125, 
        justifyContent: 'flex-end', //dikeyde center dersem ortalar flex-end en alta atar
        alignItems: 'center'}} // yatayda center dersem ortalar
        >
        <Text style={{ fontSize: 20, fontWeight: "bold", color: 'white'}}> KAYIT OLUŞTUR</Text>
        </View>

        <View style={{ flex: 1, padding:10}}>
            <ScrollView>
                <Formik initialValues={{ 
                    email: '', 
                    name: '', 
                    surname:'', 
                    phone: '', 
                    password: '', 
                    passwordConfirm:'',
                    agrementConfirm: false,
                }}
                validationSchema={registerSchema}
                onSubmit={values => Alert.alert('Form Değerleri', JSON.stringify(values, null, 2))}>
                    {({ handleChange, handleSubmit, values, setFieldValue, errors }) => (
                        <View>
                         <Input 
                         size='large' 
                         style={{ marginVertical: 10}} 
                         value={values.name}
                         label={'İsim:'} 
                         status={errors.name ? 'danger': 'warning'}
                         placeholder='İsim bilgisi giriniz..'
                         onChangeText={handleChange('name')}
                         caption={errors.name}
                         /> 

                         <Input 
                         size='large' 
                         style={{ marginVertical: 10}} 
                         value={values.surname}
                         label={'Soyisim:'} 
                         status={errors.surname ? 'danger': 'warning'}
                         placeholder='Soyisim bilgisi giriniz..'
                         onChangeText={handleChange('surname')}
                         caption={errors.surname}
                         />   
                         
                         <Input 
                         size='large' 
                         style={{ marginVertical: 10}} 
                         value={values.email}
                         label={'E-mail:'} 
                         status={errors.email ? 'danger': 'warning'}
                         placeholder='E-mail bilgisi giriniz..'
                         onChangeText={handleChange('email')}
                         caption={errors.email}
                         />   

                        <Input 
                         size='large' 
                         style={{ marginVertical: 10}} 
                         value={values.phone}
                         label={'Telefon:'} 
                         status={errors.phone ? 'danger': 'warning'}
                         placeholder='Telefon bilgisi giriniz..'
                         onChangeText={handleChange('phone')}
                         caption={errors.phone}
                         />   

                         <Input 
                         size='large' 
                         style={{ marginVertical: 10}} 
                         value={values.password}
                         label={'Şifre:'} 
                         status={errors.password ? 'danger': 'warning'}
                         placeholder='Şifre bilgisi giriniz..'
                         onChangeText={handleChange('password')}
                         caption={errors.password}
                         />   

                         <Input 
                         size='large' 
                         style={{ marginVertical: 10}} 
                         value={values.passwordConfirm}
                         label={'Şifre Tekrarı:'} 
                         status={errors.passwordConfirm ? 'danger': 'warning'}
                         placeholder='Şifre tekrarını giriniz..'
                         onChangeText={handleChange('passwordConfirm')}
                         caption={errors.passwordConfirm}
                         />  
                         
                         <View>
                         <Toggle checked={values.agrementConfirm} 
                         onChange={(value) => setFieldValue('agrementConfirm', value)} status='danger'
                       >
                            Kullanıcı Sözleşmesini ve Gizlilik Anlaşmasını Kabul Ediyorum.
                         </Toggle>
                         {errors.agrementConfirm && (<Text style={{color: 'red'}}>{errors.agrementConfirm} </Text>)}
                         </View> 


                         <Button style={{ marginTop: 30}} 
                         onPress={handleSubmit}
                         status='warning'>KAYDET</Button>
                        </View>
                    )}
                
                </Formik>
            </ScrollView>
        </View>
      
    </View>


  )
}

export default FormikYup;

const styles = StyleSheet.create({
    container:  {
        flex:1

    },
});