class Symphony < Formula
  desc "E2E testing made effortless for web"
  homepage "https://github.com/kriptonian1/symphony"
  version "1.2.3"
  license "MIT"
 
  on_macos do
    if Hardware::CPU.intel?
      url "https://github.com/kriptonian1/symphony/releases/download/v1.2.3/symphony-darwin-x64.tar.gz"
      sha256 "b8e9891b7c93b530f955b5c3ddcdec1f15811b1e8916b63b1b2c3bda1f4edd7b"
    else
      url "https://github.com/kriptonian1/symphony/releases/download/v1.2.3/symphony-darwin-arm64.tar.gz"
      sha256 "8c5d62ac0de11e47905aace7b169074c699e0163b6b5d674b83c82451c05628e"
    end
  end
 
  def install
    bin.install "symphony"
  end
 
  test do
    system "#{bin}/symphony", "--version"
  end
end
