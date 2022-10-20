import { helpers, required , minLength, maxLength, email, sameAs} from "@vuelidate/validators"


//message d'erreur personnalisé pour vuelidate
const errorPassword = helpers.withMessage(
    'Le mot de passe doit contenir entre 8 et 20 caractère, avec au moins une majuscule, une miniscule, un chiffre et un caractère spécial.',
    (value) =>
        RegExp(/[\w\W]+/).test(value) &&
        RegExp(/[0-9]+/).test(value) &&
        RegExp(/[A-Z]+/).test(value) &&
        RegExp(/[&@*.!?,+-/]/).test(value)
)

 const requiredValue = helpers.withMessage("Ce champs est obligatoire", required)
 const minL = (min) => helpers.withMessage(`Longueur minimum authorisée ${min} `, minLength(min)) 
 const maxL = (max) => helpers.withMessage(`Longueur maximum authorisée ${max} `, maxLength(max)) 
 const mail = helpers.withMessage("La saisie ne correspond pas au format d'une adresse email", email)
 const same = (pswd) => helpers.withMessage("Les deux saisies du nouveau mot de passe doivent correspondre", sameAs(pswd))
export {
    errorPassword,
    requiredValue,
    minL,
    maxL,
    mail,
    same
}