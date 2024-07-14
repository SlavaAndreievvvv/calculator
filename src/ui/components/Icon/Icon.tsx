interface IconProps {
  className?: string;
  id: string;
}

export const Icon = ({ className, id }: IconProps) => {
  return (
    <svg className={className}>
      <use href={`/svg/sprite.svg#${id}`} />
    </svg>
  );
};
