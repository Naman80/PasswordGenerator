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
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Password Generator</Text>
          </View>

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
                  <Text style={[styles.heading, styles.upperCase]}>
                    Include UpperCase
                  </Text>
                  <BouncyCheckbox
                    fillColor="blue"
                    disableBuiltInState
                    onPress={() => setUpperCase(!upperCase)}
                    isChecked={upperCase}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={[styles.heading, styles.lowerCase]}>
                    Include LowerCase
                  </Text>
                  <BouncyCheckbox
                    fillColor="green"
                    disableBuiltInState
                    onPress={() => setLowerCase(!lowerCase)}
                    isChecked={lowerCase}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={[styles.heading, styles.numbers]}>
                    Include Numbers
                  </Text>
                  <BouncyCheckbox
                    fillColor="crimson"
                    disableBuiltInState
                    onPress={() => setNumbers(!numbers)}
                    isChecked={numbers}
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={[styles.heading, styles.symbols]}>
                    Include Symbols
                  </Text>
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
            <View style={styles.generatedPasswordContainer}>
              <Text selectable style={styles.generatedPassword}>
                {password}
              </Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {},
  titleContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {fontSize: 24, fontWeight: 'bold', margin: 10, color: 'white'},
  heading: {fontSize: 18},
  errorText: {color: 'crimson', fontSize: 15},
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    alignContent: 'center',
  },
  inputColumn: {flex: 1, justifyContent: 'center'},
  inputStyle: {
    paddingHorizontal: 10,
    borderWidth: 2,
    paddingVertical: 2,
  },

  upperCase: {color: 'blue'},
  lowerCase: {color: 'green'},
  numbers: {color: 'crimson'},
  symbols: {color: 'pink'},

  formActions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  primaryBtn: {
    borderWidth: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: 'mediumseagreen',
  },
  primaryBtnText: {color: 'white', fontWeight: 'bold', fontSize: 15},
  secondaryBtn: {
    borderWidth: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: 'crimson',
  },
  secondaryBtnText: {color: 'white', fontWeight: 'bold', fontSize: 15},

  card: {
    height: 150,
    borderRadius: 10,
    backgroundColor: 'white',
    margin: 20,
  },
  cardElevated: {},
  subTitle: {
    color: 'black',
    fontSize: 18,
    margin: 10,
    marginBottom: 0,
    fontWeight: '400',
  },
  description: {
    color: 'black',
    fontSize: 18,
    marginHorizontal: 10,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  generatedPasswordContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  generatedPassword: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
  },
});
