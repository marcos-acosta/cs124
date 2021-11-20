import { useEffect, useRef, useState } from 'react';

export default function InputKeepCursor(props) {
    const { value, onChange, returnRef, longText, ...rest } = props;
    const [cursor, setCursor] = useState(value.length);
    const ref = useRef(null);

    useEffect(() => {
      const input = ref.current;
      if (input) input.setSelectionRange(cursor, cursor);
      returnRef(ref);
    }, [returnRef, ref, cursor, value]);

    const handleChange = (e) => {
      setCursor(e.target.selectionStart);
      onChange && onChange(e);
    };

    return longText
      ? <textarea ref={ref} value={value} onChange={handleChange} {...rest} />
      : <input ref={ref} value={value} onChange={handleChange} {...rest} />;
}