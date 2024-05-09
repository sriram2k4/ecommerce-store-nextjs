export async function isValidPassword(
  password: string,
  hashedPassword: string
) {
  console.log(password);
  console.log(hashedPassword);
  console.log(await hashpasswordfunc(password));

  return (await hashpasswordfunc(password)) === hashedPassword;
}

async function hashpasswordfunc(password: string) {
  const arrayBuffer = await crypto.subtle.digest(
    'SHA-512',
    new TextEncoder().encode(password)
  );

  return Buffer.from(arrayBuffer).toString('base64');
}
