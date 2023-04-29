import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Minimum length must be equal to 4')
    .max(16, 'Maximum length must be equal to 16')
    .required('This field is required'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePassword = (passwordLength: number) => {
    let tempString = '';
    if (upperCase) {
      tempString += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (lowerCase) {
      tempString += 'abcdefghijklmnopqrstuvwxy';
    }
    if (numbers) {
      tempString += '0123456789';
    }
    if (symbols) {
      tempString += '!@#$%^&*?/><';
    }
    let tempPasword = '';
    for (let i = 0; i < passwordLength; i++) {
      const index = Math.floor(Math.random() * tempString.length);
      tempPasword += tempString.charAt(index);
    }
    setPassword(tempPasword);
    setIsPasswordGenerated(true);
  };
  const resetPassword = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setLowerCase(false);
    setNumbers(false);
    setSymbols(false);
    setUpperCase(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{passwordLength: ''}}
            validationSchema={PasswordSchema}
            onSubmit={values => {
              console.log(values);
              generatePassword(+values.passwordLength);
            }}>
            {({
              handleChange,
              handleSubmit,
              values,
              isValid,
              errors,
              handleReset,
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Enter Password Length</Text>
                    {errors.passwordLength && (
                      <Text style={styles.errorText}>
                        {errors.passwordLength}
                      </Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    keyboardType="numeric"
                    placeholder="Ex. 8"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}> Include UpperCase</Text>
                  <BouncyCheckbox
                    fillColor="blue"
                    disableBuiltInState
                    onPress={() => setUpperCase(!upperCase)}
                    isChecked={upperCase}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}> Include LowerCase</Text>
                  <BouncyCheckbox
                    fillColor="green"
                    disableBuiltInState
                    onPress={() => setLowerCase(!lowerCase)}
                    isChecked={lowerCase}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}> Include numbers</Text>
                  <BouncyCheckbox
                    fillColor="red"
                    disableBuiltInState
                    onPress={() => setNumbers(!numbers)}
                    isChecked={numbers}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}> Include symbols</Text>
                  <BouncyCheckbox
                    fillColor="pink"
                    disableBuiltInState
                    onPress={() => setSymbols(!symbols)}
                    isChecked={symbols}
                  />
                </View>
                <View style={styles.formActions}>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={!isValid}
                    style={styles.primaryBtn}>
                    <Text style={styles.primaryBtnText}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleReset();
                      resetPassword();
                    }}
                    style={styles.secondaryBtn}>
                    <Text style={styles.secondaryBtnText}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {isPasswordGenerated && (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long press to copy</Text>
            <Text selectable style={styles.generatedPassword}>
              {password}
            </Text>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {},
  title: {fontSize: 24, fontWeight: 'bold'},
  heading: {fontSize: 18},
  errorText: {color: 'crimson', fontSize: 15},
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputColumn: {},
  inputStyle: {},
  formActions: {},

  primaryBtn: {},
  primaryBtnText: {},
  secondaryBtn: {},
  secondaryBtnText: {},

  card: {
    height: 150,
    borderRadius: 10,
    backgroundColor: 'white',
    marginHorizontal: 7,
  },
  cardElevated: {},
  subTitle: {color: 'black', fontSize: 18, margin: 10, marginBottom: 0},
  description: {color: 'black', fontSize: 18, margin: 10},
  generatedPassword: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 100,
    marginVertical: 10,
  },
});
