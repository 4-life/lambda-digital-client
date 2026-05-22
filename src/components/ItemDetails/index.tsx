import React, { memo } from 'react';
import { Item } from 'types';
import './style.scss';
import { getAvatarsUrl, getImageUrl } from 'utils/getImagesUrl';
import getTimeAgo from 'utils/timeAgo';
import kFormatter from 'utils/kFormatter';
import { useCart } from 'context/CartContext';

type Props = { item: Item; close?: () => void };

function ItemDetails({ item, close }: Props) {
  const { addToCart, isInCart } = useCart();
  const inCart = item.id ? isInCart(item.id) : false;

  const handleBuy = () => {
    addToCart(item);
    close?.();
  };

  return (
    <div className="ItemDetails">
      <figure
        className="itemPic"
        style={{ backgroundImage: `url(${getImageUrl(item.pic)})` }}
      />

      <div className="description">
        <div className="author">
          <div className="authorData">
            <figure
              className="authorAvatar"
              style={{
                backgroundImage: `url(${getAvatarsUrl(item.author.avatar)})`,
              }}
            />
            <div className="name">
              {item.author.name}
              <div className="date">{getTimeAgo(item.publishDate)} ago</div>
            </div>
          </div>
          <div className="views">{kFormatter(item.views)}</div>
        </div>

        <div className="price">
          <div className="name">{item.title}</div>
          <div className="priceVal">{item.price} ETH</div>
        </div>

        <div className="activity">
          <div className="likes">{kFormatter(item.likes)}</div>
          <div className="comments">{kFormatter(item.comments)}</div>
        </div>

        <div className="actions">
          <button
            className="buy"
            type="button"
            onClick={handleBuy}
            disabled={inCart}
          >
            {inCart ? 'In cart' : 'Buy'}
            <span className="icon" />
          </button>
          <button className="close" type="button" onClick={close}>
            Close
            <span className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(ItemDetails);
