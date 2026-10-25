# Guía visual paso a paso de CryptCat

Esta guía explica la versión web. Los archivos y las contraseñas se procesan en tu dispositivo. Para cifrar y descifrar normalmente no necesitas cuenta ni conexión a Internet.

## Cifrar un archivo

### Paso 1: Elegir un archivo

Abre la página y pulsa **Elegir archivo**. Selecciona una foto, vídeo, audio, PDF, TXT, ZIP u otro archivo. La página mostrará su nombre y tamaño.

![Paso 1: elegir un archivo](images/web-step-1-select-file.png)

### Paso 2: Escribir y confirmar la contraseña

Escribe una contraseña en **Contraseña de cifrado**. Escríbela otra vez en **Confirmar contraseña**. Continúa solo cuando aparezca que las contraseñas coinciden. Si no coinciden, corrige la segunda entrada.

![Paso 2: escribir y confirmar la contraseña](images/web-step-2-password.png)

### Paso 3: Cifrar y guardar

Pulsa **Cifrar y guardar**. El navegador guardará un archivo nuevo que termina en `.cryptcat`. No cierres ni recargues la página mientras se guarda.

![Paso 3: cifrar y guardar](images/web-step-3-encrypt.png)

## Descifrar un archivo

### Paso 4: Elegir el archivo cifrado

Abre **Descifrar**, pulsa **Elegir archivo cifrado** y selecciona el archivo `.cryptcat`. Los archivos antiguos `.crypt3` también se detectan automáticamente.

### Paso 5: Escribir la contraseña de descifrado

Escribe la contraseña original en **Contraseña de descifrado**. Una contraseña incorrecta debe producir un error y no un archivo recuperado.

### Paso 6: Descifrar y guardar

Pulsa **Descifrar y guardar**. Abre el archivo recuperado y comprueba su contenido antes de borrar cualquier copia.

## Seguridad y uso sin conexión

Si pierdes la contraseña, CryptCat no puede recuperar el archivo. No publiques contraseñas, claves API, claves de firma ni archivos privados. Para comprobar el modo sin conexión, desconecta Internet y repite los seis pasos.
