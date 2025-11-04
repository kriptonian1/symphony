class Symphony < Formula
  desc "E2E testing made effortless for web"
  homepage "https://github.com/kriptonian1/symphony"
  version "1.0.6"
  license "MIT"
 
  on_macos do
    if Hardware::CPU.intel?
      url "https://github.com/kriptonian1/symphony/releases/download/v1.0.6/symphony-darwin-x64.tar.gz"
      sha256 "3baec0bd92fbd0beeddb6bdd4009ebaf2d239f1a2ea980b58df2ebb71e963a2b"
    else
      url "https://github.com/kriptonian1/symphony/releases/download/v1.0.6/symphony-darwin-arm64.tar.gz"
      sha256 "cbbae5768dfc03b35a5a6feaab21edc3578038c01ca1802fd485176f524ac284"
    end
  end
 
  def install
    bin.install "symphony"
  end
 
  test do
    system "#{bin}/symphony", "--version"
  end
end
