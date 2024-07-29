async function hashpasswordfunc(password: string) {
  const arrayBuffer = await crypto.subtle.digest(
    'SHA-512',
    new TextEncoder().encode(password)
  );

  return Buffer.from(arrayBuffer).toString('base64');
}

const test = async () => {
  const result = await hashpasswordfunc('password');
  console.log(result);
};

test();
